const app = require('./app');

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    if(process.env.NODE_ENV !== 'production') {
        console.log(`Server started on port: ${PORT}`);
    }
});
