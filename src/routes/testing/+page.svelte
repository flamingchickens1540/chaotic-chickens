<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import { io } from 'socket.io-client';
	let admin: Socket = io({ auth: { username: 'Autumn', token: 'Admin' } });
	function sendMatch() {
		admin.emit('sendMatch', [
			'qm1',
			[
				{ teamKey: '1540A', color: 'red' },
				{ teamKey: '1540B', color: 'red' },
				{ teamKey: '2374A', color: 'red' },
				{ teamKey: '2374B', color: 'blue' },
				{ teamKey: '2471', color: 'blue' },
				{ teamKey: '2521', color: 'blue' },
				{ teamKey: '2635', color: 'blue' }
			]
		]);
	}
	function removeRobot() {
		admin.emit('leaveRobotQueue', { teamKey: '2635', color: 'blue' });
	}
	function clearRobots() {
		admin.emit('clearRobotQueue');
	}
	function clearScouts() {}
	function getKey() {
		admin.emit('getMatchKey', console.log);
	}
	function getRobots() {
		admin.emit('getRobotQueue', console.log);
	}
	function getScouts() {
		admin.emit('getScoutQueue', console.log);
	}
</script>

<button onclick={sendMatch}>send match</button>
<button onclick={removeRobot}>remove sample robot</button>
<button onclick={clearRobots}>Clear robots</button>
<button onclick={clearScouts}>clear scouts</button>
<button onclick={getKey}>get match key</button>
<button onclick={getRobots}>get robots</button>
<button onclick={getScouts}>get Scouts</button>
