const pages = [
  {title: "Home", url: "index.html"},
  {title: "About", url: "about.html"}
];

const searchBox = document.getElementById('searchBox');
const results = document.getElementById('results');

searchBox.addEventListener('input', function() {
  const q = this.value.toLowerCase();
  results.innerHTML = '';
  pages.filter(p=> p.title.toLowerCase().includes(q))
       .forEach(p=>{
         const li = document.createElement('li');
         const a = document.createElement('a');
         a.href = p.url;
         a.textContent = p.title;
         li.appendChild(a);
         results.appendChild(li);
       });
});