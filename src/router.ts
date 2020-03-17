const router = express.Router();
 
router.get('/', (request, response) => {
  response.send('Hello world!');
});