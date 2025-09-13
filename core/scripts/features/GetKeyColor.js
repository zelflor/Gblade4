   let color1 = null;
    let color2 = null;
    let color3 = null;

    function extractKeyColors(img, done) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const pixels = [];
        for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        if (a < 128) continue;
        if (Math.abs(r - 255) < 5 && Math.abs(g - 255) < 5 && Math.abs(b - 255) < 5) continue;
        const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        if (brightness < 40) continue;

        const maxc = Math.max(r, g, b);
        const minc = Math.min(r, g, b);
        const delta = maxc - minc;

        const light = (maxc + minc) / 2;
        let sat = 0;
        if (delta !== 0) {
            sat = delta / (255 - Math.abs(2 * light - 255));
        }
        if (sat < 0.25) continue; 

        if (maxc - minc < 18) continue; 
        if (r > 200 && g > 180 && b > 140) continue; 

        pixels.push([r, g, b]);
        }

      if (pixels.length === 0) return;

      const k = 5;
      const centroids = [];
      for (let i = 0; i < k; i++) {
        const p = pixels[Math.floor(Math.random() * pixels.length)];
        centroids.push([p[0], p[1], p[2]]);
      }

      for (let iter = 0; iter < 12; iter++) {
        const clusters = Array.from({ length: k }, () => []);
        for (const p of pixels) {
          let best = 0;
          let bd = 1e9;
          for (let j = 0; j < k; j++) {
            const c = centroids[j];
            const d = (p[0]-c[0])**2 + (p[1]-c[1])**2 + (p[2]-c[2])**2;
            if (d < bd) {bd = d; best = j;}
          }
          clusters[best].push(p);
        }
        for (let j = 0; j < k; j++) {
          if (clusters[j].length) {
            let r = 0, g = 0, b = 0;
            for (const p of clusters[j]) {r+=p[0];g+=p[1];b+=p[2];}
            const n = clusters[j].length;
            centroids[j] = [r/n, g/n, b/n];
          }
        }
      }

     
      const mean = centroids.reduce((acc,c)=>[acc[0]+c[0],acc[1]+c[1],acc[2]+c[2]], [0,0,0]).map(x=>x/centroids.length);
      const score = centroids.map(c=>{
        const sat = Math.max(c[0],c[1],c[2]) - Math.min(c[0],c[1],c[2]);
        const dist = Math.hypot(c[0]-mean[0], c[1]-mean[1], c[2]-mean[2]);
        return sat + dist*0.5;
      });
      const idx = score.map((s,i)=>[s,i]).sort((a,b)=>b[0]-a[0]).slice(0,3).map(x=>x[1]);
      const pick = i=> '#' + centroids[i].map(v=>('0'+Math.round(v).toString(16)).slice(-2)).join('');
      color1 = pick(idx[0]);
      color2 = pick(idx[1]);
      color3 = pick(idx[2]);

      if (typeof done === 'function') done(color1, color2, color3);
    }