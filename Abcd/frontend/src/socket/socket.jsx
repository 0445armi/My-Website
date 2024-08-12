import io from 'socket.io-client';

const socket = io('http://localhost:5175');

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
}); 