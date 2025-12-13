import { type FrontendTeamMatch } from './src/lib/types';
import { Server } from 'socket.io';
import { type ViteDevServer } from 'vite';
let robotQueue: { teamKey: string; color: 'red' | 'blue' }[] = [];
let matchKey: string = '';
let scoutUsernames: Map<string, string> = new Map();
let matchSubmitted = true;
let scouting: string[] = [];
const info = (s: string) => console.log(`\x1b[32m${s}\x1b[0m`);
const warn = (s: string) => console.log(`\x1b[33m${s}\x1b[0m`);
const formatTeams = (teams: { teamKey: string; color: 'red' | 'blue' }[]) =>
	teams
		.map((team) => {
			if (team.color == 'red') {
				return ` \x1b[31m${team.teamKey}\x1b[0m`;
			} else {
				return ` \x1b[34m${team.teamKey}\x1b[0m`;
			}
		})
		.join();

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) {
			warn('Server not properly configured');
			return;
		}
		const io = new Server(server.httpServer);
		io.use((socket, next) => {
			const username = socket.handshake.auth.username;
			if (!username) {
				return next(new Error('No username provided'));
			}
			Array.from(scoutUsernames.entries())
				.filter(([_id, user]) => user === username)
				.forEach(([id, _user]) => scoutUsernames.delete(id));
			scoutUsernames.set(socket.id, username);
			next();
		});
		io.on('connect', (socket) => {
			if (socket.handshake.auth.token == 'admin') {
				info(`Admin aquired: ${socket.handshake.auth.username}`);
				socket.join('admin');
			}
			socket.on('newUser', (user: string) => {
				scoutUsernames.set(socket.id, user);
				info(`New user ${user} on socket ${socket.id}`);
			});
			socket.on('joinQueue', () => {
				const username = scoutUsernames.get(socket.id);
				if (scouting.find((user) => user == username)) {
					// have an override?
					socket.emit('currentlyScouting');
					warn(`${username} joined scout queue while in a match`);
					return;
				}
				if (!username) {
					warn(`Undefined scout joined queue. ID: ${socket.id}`);
					socket.disconnect();
					return;
				}
				const nextRobot = robotQueue.pop();
				if (!nextRobot) {
					io.to('admin').emit('scoutQueued', username);

					if (!matchSubmitted) {
						socket.emit('queueFull');
					}
					info(`${username} joined queue`);
					socket.join('scoutQueue');
					return;
				}
				scouting.push(username);
				info(`${username} started scouting`);
				io.to('admin').emit('robotLeftQueue', {
					nextRobot,
					scout: username
				});
				info(`${username} recieved robot ${nextRobot.teamKey}`);
				socket.emit('recieveRobot', [matchKey, nextRobot]);
			});
			async function leaveScoutQueue(scoutId: string) {
				const socketId = Array.from(scoutUsernames.entries())
					.filter(([_id, user]) => user == scoutId)
					.map(([id, _user]) => id)[0];
				io.emit('scoutLeftQueue', scoutId);
				const socket = (await io.in('scoutQueue').fetchSockets()).find(
					(socket) => socket.id == socketId
				);
				if (!socket) {
					warn(`Scout not in queue left queue: ${scoutId}`);
					return;
				}
				socket.leave('scoutQueue');

				const scoutQueue = (await io.in('scoutQueue').fetchSockets()).map((socket) => socket.id);
				if (scoutQueue.length === 0) {
					info(`${scoutId} left queue; scout queue now empty`);
				} else {
					info(`${scoutId} left queue; scout queue length: ${scoutQueue.length}`);
				}
			}

			socket.on('leaveScoutQueue', leaveScoutQueue);

			socket.on('leaveRobotQueue', (robot: { teamKey: string; color: 'red' | 'blue' }) => {
				const robotsEqual = (
					robot1: { teamKey: string; color: 'red' | 'blue' },
					robot2: { teamKey: string; color: 'red' | 'blue' }
				) => robot1.teamKey === robot2.teamKey && robot1.color === robot2.color;
				const index = robotQueue.findIndex((compared) => robotsEqual(robot, compared));
				if (index === -1) return;
				robotQueue.splice(index, 1);
			});
			socket.on(
				'sendMatch',
				async ([nextMatchKey, teams]: [string, { teamKey: string; color: 'red' | 'blue' }[]]) => {
					// info('new match');
					// if (!socket.rooms.has('admin')) return;
					const teamsPrint: string = formatTeams(teams);
					info(`New Match (${nextMatchKey}):${teamsPrint}`);
					robotQueue = [];
					const scoutQueue = await io.in('scoutQueue').fetchSockets();
					for (const scout of scoutQueue.filter(
						(scout) => scout && scout.id && scoutUsernames.get(scout.id)
					)) {
						const nextRobot = teams.pop();
						if (!nextRobot) break;
						const username = scoutUsernames.get(scout.id);
						if (!username) {
							warn(`user without name tried to recieve robot. id: ${socket.id}`);
							continue;
						}
						info(`${username} recieved robot ${nextRobot.teamKey} from queue`);
						scout.leave('scoutQueue');
						scouting.push(username);
						scout.emit('recieveRobot', [nextMatchKey, nextRobot]);
						io.to('admin').emit('robotLeftQueue', { nextRobot, scout: username });
						io.to('admin').emit('scoutLeftQueue', username);
					}
					io.to('admin').emit('robotJoinedQueue', teams);
					robotQueue = teams;
					matchKey = nextMatchKey;
				}
			);
			socket.on('clearRobotQueue', () => {
				const teamsPrint: string = formatTeams(robotQueue);

				info(`Robot queue cleared. It was ${teamsPrint}`);
				robotQueue = [];
			});
			socket.on('getMatchKey', (callback) => {
				info(`Sending match key ${matchKey}`);
				callback({ matchKey });
			});
			socket.on('getRobotQueue', (callback) => {
				info(`Sending robot queue `);
				callback({ robots: robotQueue });
			});
			socket.on('getScoutQueue', async (callback) => {
				const scouts = (await io.in('scoutQueue').fetchSockets()).map((scout) =>
					scoutUsernames.get(scout.id)
				);
				callback({
					scouts
				});
			});
			socket.on('submitTeamMatch', (teamMatch: FrontendTeamMatch) => {
				const username = teamMatch.scout;
				info(`${username} submitted teamMatch`);
				scouting.splice(
					scouting.findIndex((user) => user == username),
					1
				);
				matchSubmitted = true;
				io.to('admin').emit('submittedTeamMatch', teamMatch);
			});
			socket.on('wentHome', () => {
				const username = scoutUsernames.get(socket.id);
				if (username && scouting.find((user) => user == username)) {
					scouting.splice(
						scouting.findIndex((user) => user == username),
						1
					);
				}
			});
			socket.on('disconnect', async (_reason) => {
				const scoutId = scoutUsernames.get(socket.id);
				if (!scoutId) return;
				io.to('admin').emit('scoutLeftQueue', scoutId);
				scoutUsernames.delete(socket.id);
				leaveScoutQueue(scoutId);
			});
		});
	}
};

export default webSocketServer;
