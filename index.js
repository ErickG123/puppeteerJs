const puppeteer = require('puppeteer');
const fs = require('fs'); 

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/barrabonitaoficial/');
  
  const imgList = await page.evaluate(() => {
    // Toda essa função será executada no browser
    
    // Vamos pegar todas as imagens que estão na parte de posts
    const nodeList = document.querySelectorAll('article img');

    // Transformar o NodeLis em array
    const imgArray = [...nodeList];

    // Tranformar os elementos html em objetos JS
    const imgList = imgArray.map(({src}) => ({
        src
    }));

    // Colocar para fora da função
    return imgList;
  });
 
  // Escrevendo os dados em um arquivo local (JSON)
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
      if(err) throw new Error('Something went wrong');

      console.log('Well done');
  });

  await browser.close();
})();