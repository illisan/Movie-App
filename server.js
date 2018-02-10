const express = require('express')  //these are the dependencies needed to run this project.
const app = express()

const port = process.argv[2] || 8080   //assigning the port to a variable will help us when/if a port other than 8080 is chosen.
app.set('view engine', 'ejs');  //implementing ejs as the rendering engine. use app.render()


app.use(express.static('public'))

const movies = [

    {
        id: 0,
        title: 'Ferris Bueller\'s Day Off',
        year: '1986',
        rated: 'PG-13',
        released: '11 June 1986',
        runtime: '1h 43min',
        genre: 'Comedy',
        director: 'John Hughes',
        writer: 'John Hughes',
        actors: 'Matthew Broderick , Alan Ruck, Mia Sara, Jeffrey JonesEdward James Olmos',
        plot: 'High school student Ferris Bueller wants a day off from school and he\'s developed an incredibly sophisticated plan to pull it off. He talks his friend Cameron into taking his father\'s prized Ferrari and with his girlfriend Sloane head into Chicago for the day.',
        language: 'English',
        country: 'USA, Hong Kong',
        image: '/imgs/FerrisBueller.jpg'
    }, {
        id: 1,
        title: 'The Emperor\'s New Groove',
        year: '2000',
        rated: 'G',
        released: '15 December 2000',
        runtime: '1h 18min',
        genre: 'Animation, Adventure, Comedy ',
        director: 'Mark Dindal',
        writer: 'Chris Williams, Mark Dindal',
        actors: 'David Spade, John Goodman, Eartha Kitt',
        plot: 'In this animated comedy from the folks at Disney, the vain and cocky Emperor Kuzco is a very busy man. Besides maintaining his "groove", and firing his suspicious administrator, Yzma; he\'s also planning to build a new waterpark just for himself for his birthday.',
        language: 'English',
        country: 'USA',
        image: '/imgs/Emperor.jpg'
    }, {
        id: 2,
        title: 'Blade Runner',
        year: '1982',
        rated: 'R',
        released: '25 June 1982',
        runtime: '1h 57min',
        genre: 'Sci-Fi, Thriller',
        director: 'Ridley Scott',
        writer: 'Hampton Fancher, David Peoples',
        actors: 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
        plot: 'A blade runner must pursue and try to terminate four replicants who stole a ship in space and have returned to Earth to find their creator.',
        language: 'English',
        country: 'USA, Hong Kong',
        image: '/imgs/BladeRunner.jpg'
    }, {
        id: 3,
        title: 'The Devil Wears Prada',
        year: '2006',
        rated: 'PG-13',
        released: '30 June 2006',
        runtime: '1h 49min',
        genre: 'Comedy, Drama',
        director: 'David Frankel',
        writer: 'Aline Brosh McKenna , Lauren Weisberger ',
        actors: 'Anne Hathaway, Meryl Streep, Adrian Grenier , Emily Blunt',
        plot: 'A smart but sensible new graduate lands a job as an assistant to Miranda Priestly, the demanding editor-in-chief of a high fashion magazine.',
        language: 'English',
        country: 'USA, France',
        image: '/imgs/DevilWearsP.jpg'
    }, {
        id: 4,
        title: 'Superbad',
        year: '2007',
        rated: 'R',
        released: '17 August 2007',
        runtime: '1h 53min',
        genre: 'Comedy',
        director: ' Greg Mottola',
        writer: 'Seth Rogen, Evan Goldberg',
        actors: 'Jonah Hill, Michael Cera, Christopher Mintz-Plasse, Seth Rogen, Emma Stone',
        plot: 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.',
        language: 'English',
        country: 'USA',
        image: '/imgs/Superbad.jpg'
    }]


    
    
app.get('/', (req, res) => {
    res.render('index', {
        movies
    })
})

app.get('/search', (req, res) => {
    const movieSearch = req.query.searchterm
    console.log(movieSearch)
    let result = movies
    if (movieSearch) { 
        result = movies.filter((movie) => {
            return movie.title.toLowerCase().includes(movieSearch.toLowerCase())
            // console.log(result)
        })
        
    }
    console.log(result)
    res.render('index', {
        movies : result
    })

})

app.get('/movieinfo', (req, res) => {
    res.render('movieinfo', {
        movies
    })
})


app.get('/movieinfo/:movieid', (req, res) => {
    let { movieid } = req.params
    res.render('movieinfo', {
        movies,
        movieid

    })
})

app.use((req, res, next) => {
    if (req.accepts('html') && res.status(404)) {
        res.render('error');
        return;
    }
});



app.listen(port, () => {
    console.log(`listening on port ${port}`)

})

