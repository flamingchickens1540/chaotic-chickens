import { error, info, warn } from 'console';
import { type FrontendTeamMatch } from './src/lib/types';
import { Server } from 'socket.io';
import { type ViteDevServer } from 'vite';
let robot_queue: { team_key: string; color: 'red' | 'blue' }[] = [];
let match_key: string = '';
let scout_usernames: Map<string, string> = new Map();
let match_submitted = false;

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;
		const io = new Server(server.httpServer);
		io.use((socket, next) => {
			const username = socket.handshake.auth.username;
			if (!username) {
				return next(new Error('No username provided'));
			}
			Array.from(scout_usernames.entries())
				.filter(([_id, user]) => user === username)
				.forEach(([id, _user]) => scout_usernames.delete(id));
			scout_usernames.set(socket.id, username);
		});
		io.on('connect', (socket) => {
			socket.on('new_user', (user: string) => {
				scout_usernames.set(socket.id, user);
				info(`New user ${user} on socket ${socket.id}`);
			});
			socket.on('join_queue', () => {
				const username = scout_usernames.get(socket.id);
				if (!username) {
					warn(`Undefined scout joined queue. ID: ${socket.id}`);
					socket.disconnect();
					return;
				}
				const next_robot = robot_queue.pop();
				if (!next_robot) {
					io.to('admin_room').emit('scout_queued', username);
					if (!match_submitted) {
						socket.emit('queue full');
					}
					info(`${username} joined queue`);
					socket.join('scout_queue');
					return;
				}
				io.to('admin_room').emit('robot_left_queue', {
					next_robot,
					scout: username
				});
				info(`${username} recieved robot ${next_robot.team_key}`);
				socket.emit('recieve_robot', [match_key, next_robot]);
			});
			async function leave_scout_queue(scout_id: string) {
				const socket_id = Array.from(scout_usernames.entries())
					.filter(([_id, user]) => user == scout_id)
					.map(([id, _user]) => id)[0];
				io.emit('scout_left_queue', scout_id);
				const socket = (await io.in('scout_queue').fetchSockets()).find(
					(socket) => socket.id == socket_id
				);
				if (!socket) {
					return;
				}
				socket.leave('scout_queue');

				const scout_queue = (await io.in('scout_queue').fetchSockets()).map((socket) => socket.id);
				if (scout_queue.length === 0) {
					info(`${scout_id} left queue; scout queue now empty`);
				} else {
					info(`${scout_id} left queue; scout queue length: ${scout_queue.length}`);
				}
			}

			socket.on('leave_scout_queue', leave_scout_queue);

			socket.on('leave_robot_queue', (robot: { team_key: string; color: 'red' | 'blue' }) => {
				const robotsEqual = (
					robot1: { team_key: string; color: 'red' | 'blue' },
					robot2: { team_key: string; color: 'red' | 'blue' }
				) => robot1.team_key === robot2.team_key && robot1.color === robot2.color;
				const index = robot_queue.findIndex((robot_t) => robotsEqual(robot, robot_t));
				if (index === -1) return;
				robot_queue.splice(index, 1);
			});
			socket.on(
				'send_match',
				async ([next_match_key, teams]: [
					string,
					{ team_key: string; color: 'red' | 'blue' }[]
				]) => {
					if (!socket.rooms.has('admin_room')) return;
					const teams_print: string = teams
						.map((team) => {
							if (team.color == 'red') {
								return ` \x1b[31m${team.team_key}\x1b[0m`;
							} else {
								return ` \x1b[34m${team.team_key}\x1b[0m`;
							}
						})
						.join();
					info(`New Match (${next_match_key}):${teams_print}`);
					robot_queue = [];
					const scout_queue = await io.in('scout_queue').fetchSockets();
					for (const scout of scout_queue.filter(
						(scout) => scout && scout.id && scout_usernames.get(scout.id)
					)) {
						const next_robot = teams.pop();
						if (!next_robot) break;
						const username = scout_usernames.get(scout.id);
						info(`${username} recieved robot ${next_robot.team_key} from queue`);
						scout.leave('scout_queue');
						scout.emit('recieve_robot', [next_match_key, next_robot]);
						io.to('admin_room').emit('robot_left_queue', { next_robot, scout: username });
					}
					io.to('admin_room').emit('robot_joined_queue', teams);
					robot_queue = teams;
					match_key = next_match_key;
				}
			);
			socket.on('clear_robot_queue', () => {
				robot_queue = [];
			});
			socket.on('get_match_key', (callback) => {
				callback({ match_key });
			});
			socket.on('get_robot_queue', (callback) => {
				callback({ robots: robot_queue });
			});
			socket.on('get_scout_queue', async (callback) => {
				const scouts = (await io.in('scout_queue').fetchSockets()).map((scout) =>
					scout_usernames.get(scout.id)
				);
				callback({
					scouts
				});
			});
			socket.on('submit_team_match', (team_match: FrontendTeamMatch) => {
				match_submitted = true;
				io.to('admin_room').emit('submitted_team_match', team_match);
			});
			socket.on('disconnect', async (_reason) => {
				const scout_id = scout_usernames.get(socket.id);
				if (!scout_id) return;
				scout_usernames.delete(socket.id);
				leave_scout_queue(scout_id);
			});
		});
	}
};

export default webSocketServer;
