const searchText = document.querySelector("#searchState");

searchText.addEventListener('input', () => searchState(searchText.value));

async function searchState(state) {
    const data = await fetch('../data/states.json');
    const states = await data.json();

    let result = states
        .filter(st => st.abbr.startsWith(state)
            || st.name.indexOf(state) != -1);

    if (state.length == 0)
        result = [];
    
    outputHtml(result);
}

function outputHtml(result) {
    if (result.length > 0)  {
        const states = document.querySelector("#states");
        const html = result.map(result => `<div class="card mb-2">
            <div class="card-body bg-info">
                <h4>${result.name} (${result.abbr})
                  <span class="text-primary"> ${result.capital} </span>
                </h4>
            </div>
            </div>`
        ).join('');
        states.innerHTML = html;
    } else {
        states.innerHTML = '';
    }
  
}

