chartData();
    async function chartData() {
      const data = await getData();
      const ctx = document.getElementById('kline').getContext('2d');
      const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: data.xlabels,
          datasets: [{
              label: `Highest Price | Kline Data`,
              data: data.ylabels,
              fill: false,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
        }
      });
    }

    async function getData() {
      const xlabels = [];
      const ylabels = [];

      const response = await fetch('kline_data.csv');
      const data = await response.text();
      console.log(data);

      const table = data.split('\n').slice(1);
      table.forEach(row => {
        const columns = row.split(',');
        const openingPrice = columns[0];
        xlabels.push(openingPrice);
        const highestPrice = columns[3];
        ylabels.push(highestPrice)
        console.log(columns);
        console.log(openingPrice, highestPrice);
      });
      return { xlabels, ylabels };
    }