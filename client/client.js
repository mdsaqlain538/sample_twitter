console.log('Hello World!')
const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const TweetElement = document.querySelector('.tweets');

const API_URL = 'http://localhost:3000/tweet';

loadingElement.style.display = 'none';

listAllTweet();

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    listAllTweet();
    listAllTweet();
    const formdata = new FormData(form);
    const name = formdata.get('username');
    const content = formdata.get('content');
    const created = new Date();

    const obj = {
        name,
        content,
        created
    };

    //console.log(obj);

    fetch(API_URL,{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'content-type':'application/json'
        }
    }).then(response=>response.json())
    .then(ct=>{
        console.log(ct);
    })
    form.reset();
    listAllTweet();
});

function listAllTweet(){
    //TweetElement.innerHTML = '';
    fetch(API_URL)
    .then(response =>response.json())
    .then(tweets=>{
        console.log(tweets);
        tweets.reverse();
        tweets.forEach(tweet=>{
            const div = document.createElement('div');


            const header = document.createElement('h3');
            header.textContent = tweet.name;

            const content = document.createElement('p');
            content.textContent = tweet.content;

            const date = document.createElement('small');
            date.textContent = '2020-03-17T17:47:42.946Z IST';

            div.appendChild(header);
            div.appendChild(content);
            div.appendChild(date);
            TweetElement.appendChild(div);
        });
        loadingElement.style.display = 'none';
    });
}