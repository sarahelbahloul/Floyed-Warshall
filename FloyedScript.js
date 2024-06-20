
        let Vertices = [];
        let Edges = [];
        let graph = [];

        function addVertex() {
            if (Vertices.length < 26) {
                let letter = String.fromCharCode(65 + Vertices.length); // A, B, C, ...
                Vertices.push(letter);

                let circle = document.createElement('div');
                circle.className = 'circle';
                circle.textContent = letter;
                document.getElementById('circlesContainer').appendChild(circle);

                addOptionToSelect('fromVertex', letter);
                addOptionToSelect('toVertex', letter);

                updateGraphForNewVertex();
            } else {
                alert('Maximum number of vertices reached (26).');
            }
        }

        function addOptionToSelect(selectId, letter) {
            let select = document.getElementById(selectId);
            let option = document.createElement('option');
            option.value = letter;
            option.textContent = letter;
            select.appendChild(option);
        }

        function updateGraphForNewVertex() {
            graph.push(new Array(Vertices.length).fill(null));
            for (let i = 0; i < graph.length - 1; i++) {
                graph[i].push(null);
            }
        }

        function addEdge() {
            let fromVertex = document.getElementById('fromVertex').value;
            let toVertex = document.getElementById('toVertex').value;
            let weight = parseFloat(document.getElementById('weight').value);

            if (fromVertex === 'choose' || toVertex === 'choose' || isNaN(weight)) {
                alert('Please select vertices and add a valid weight.');
                return;
            }

            let fromIndex = Vertices.indexOf(fromVertex);
            let toIndex = Vertices.indexOf(toVertex);
            if (document.getElementById('Directed').checked) {
                graph[fromIndex][toIndex] = weight;
            }
            else if (document.getElementById('InDirected').checked) {
                graph[fromIndex][toIndex] = weight;
                graph[toIndex][fromIndex] = weight;
            }
            else {
                alert('You must choose graph type directed or indirected');
                return
            }
            let edgeInfo = `Edge added: ${fromVertex} -> ${toVertex} (Weight: ${weight})`;
            document.getElementById('edgesContainer').innerHTML += `<div>${edgeInfo}</div>`;
        }

        function floydWarshall() {
            let dist = [];

            for (let i = 0; i < graph.length; i++) {
                dist[i] = [];
                for (let j = 0; j < graph.length; j++) {
                    if (i === j) {
                        dist[i][j] = 0;
                    } else if (graph[i][j] === null) {
                        dist[i][j] = Infinity;
                    } else {
                        dist[i][j] = graph[i][j];
                    }
                }
            }

            document.getElementById('resultMatrix').innerHTML = '<strong>Initial Distance Matrix (D^0)</strong><br>' + displayMatrix(dist);

            for (let k = 0; k < graph.length; k++) {
                for (let i = 0; i < graph.length; i++) {
                    for (let j = 0; j < graph.length; j++) {
                        if (dist[i][k] !== Infinity && dist[k][j] !== Infinity && dist[i][j] > dist[i][k] + dist[k][j]) {
                            dist[i][j] = dist[i][k] + dist[k][j];
                        }
                    }
                }
            }

            document.getElementById('resultMatrix').innerHTML += '<br><br><strong>Shortest Distance Matrix (Final)</strong><br>' + displayMatrix(dist);
        }

        function displayMatrix(matrix) {
            let html = '<table border="1">';
            for (let row of matrix) {
                html += '<tr>';
                for (let cell of row) {
                    html += `<td>  ${cell === Infinity ? '∞' : cell}  </td>`;
                }
                html += '</tr>';
            }
            html += '</table>';
            return html;
        }
