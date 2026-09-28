/**
 * SmartShop Algorithm Visualizer Engine
 * Generates and steps through animation states for Merge Sort, Quick Sort, and Binary Search.
 */

(function() {
    let currentAlgorithm = 'merge_sort';
    let dataSize = 12;
    let speedMs = 600;
    let isPlaying = false;
    let playInterval = null;
    let steps = [];
    let currentStepIndex = 0;
    let baseItems = [];

    // DOM Elements
    const stage = document.getElementById('visualizerStage');
    const algoSelect = document.getElementById('visualizerAlgorithmSelect');
    const sizeSelect = document.getElementById('dataSizeSelect');
    const speedSelect = document.getElementById('speedSelect');
    const targetPriceGroup = document.getElementById('targetPriceGroup');
    const dataSizeGroup = document.getElementById('dataSizeGroup');
    const targetInput = document.getElementById('binarySearchTargetInput');
    const playBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const playText = document.getElementById('playText');
    const stepFwdBtn = document.getElementById('stepForwardBtn');
    const stepBackBtn = document.getElementById('stepBackwardBtn');
    const resetBtn = document.getElementById('resetShuffleBtn');
    const compCounter = document.getElementById('liveComparisonCounter');
    const swapCounter = document.getElementById('liveSwapCounter');
    const complexityDisplay = document.getElementById('liveComplexityDisplay');
    const progressBadge = document.getElementById('stepProgressBadge');
    const algoBadge = document.getElementById('activeAlgorithmBadge');
    const explanationText = document.getElementById('currentExplanationText');
    const statusText = document.getElementById('arrayStatusText');
    const infoBox = document.getElementById('algorithmExplanationBox');

    if (!stage) return;

    // Load initial products from catalog or fallback
    function generateInitialData(size) {
        const catalog = window.CATALOG_PRODUCTS || [];
        const items = [];
        if (catalog.length >= size) {
            // Pick a diverse slice
            const shuffled = [...catalog].sort(() => 0.5 - Math.random());
            for (let i = 0; i < size; i++) {
                items.push({
                    id: shuffled[i].id,
                    name: shuffled[i].name,
                    price: shuffled[i].price
                });
            }
        } else {
            const fallbackPrices = [1499, 1999, 4490, 8995, 12000, 18000, 25000, 34999, 39999, 45000, 65000, 89999];
            for (let i = 0; i < size; i++) {
                items.push({
                    id: `PROD-${101+i}`,
                    name: `Sample Item ${i+1}`,
                    price: fallbackPrices[i % fallbackPrices.length]
                });
            }
        }
        return items;
    }

    // ==========================================
    // STEP TRACE GENERATORS
    // ==========================================

    function generateMergeSortSteps(items) {
        const trace = [];
        const arr = items.map(it => ({ ...it }));
        let comparisons = 0;
        let merges = 0;

        trace.push({
            arr: arr.map(x => ({ ...x, status: 'default' })),
            explanation: 'Initial unsorted array of product prices.',
            comparisons: 0,
            swaps: 0,
            status: 'Initialized'
        });

        function merge(start, mid, end) {
            const left = arr.slice(start, mid + 1);
            const right = arr.slice(mid + 1, end + 1);

            trace.push({
                arr: arr.map((x, idx) => ({
                    ...x,
                    status: (idx >= start && idx <= end) ? 'range' : 'default'
                })),
                explanation: `Preparing to merge sorted sub-arrays [${start}..${mid}] and [${mid+1}..${end}].`,
                comparisons,
                swaps: merges,
                status: 'Merging Sub-Arrays'
            });

            let i = 0, j = 0, k = start;
            while (i < left.length && j < right.length) {
                comparisons++;
                const compLeftIdx = start + i;
                const compRightIdx = mid + 1 + j;

                trace.push({
                    arr: arr.map((x, idx) => ({
                        ...x,
                        status: (idx === compLeftIdx || idx === compRightIdx) ? 'comparing' : (idx >= start && idx <= end ? 'range' : 'default')
                    })),
                    explanation: `Comparing ₹${left[i].price.toLocaleString()} and ₹${right[j].price.toLocaleString()}`,
                    comparisons,
                    swaps: merges,
                    status: 'Comparing Elements'
                });

                if (left[i].price <= right[j].price) {
                    arr[k] = left[i];
                    i++;
                } else {
                    arr[k] = right[j];
                    j++;
                }
                merges++;
                k++;

                trace.push({
                    arr: arr.map((x, idx) => ({
                        ...x,
                        status: (idx === k - 1) ? 'swapped' : (idx >= start && idx <= end ? 'range' : 'default')
                    })),
                    explanation: `Placed smaller element into merged array at index ${k - 1}`,
                    comparisons,
                    swaps: merges,
                    status: 'Merged Element'
                });
            }

            while (i < left.length) {
                arr[k] = left[i];
                i++;
                k++;
                merges++;
            }
            while (j < right.length) {
                arr[k] = right[j];
                j++;
                k++;
                merges++;
            }

            trace.push({
                arr: arr.map((x, idx) => ({
                    ...x,
                    status: (idx >= start && idx <= end) ? (start === 0 && end === arr.length - 1 ? 'sorted' : 'default') : 'default'
                })),
                explanation: `Completed merge for range [${start}..${end}].`,
                comparisons,
                swaps: merges,
                status: 'Sub-Array Merged'
            });
        }

        function mergeSortRec(start, end) {
            if (start >= end) return;
            const mid = Math.floor((start + end) / 2);
            mergeSortRec(start, mid);
            mergeSortRec(mid + 1, end);
            merge(start, mid, end);
        }

        mergeSortRec(0, arr.length - 1);

        trace.push({
            arr: arr.map(x => ({ ...x, status: 'sorted' })),
            explanation: 'Merge Sort complete! All product prices are now in ascending order (Low → High).',
            comparisons,
            swaps: merges,
            status: 'Sorted'
        });

        return trace;
    }

    function generateQuickSortSteps(items) {
        const trace = [];
        const arr = items.map(it => ({ ...it }));
        let comparisons = 0;
        let swaps = 0;

        trace.push({
            arr: arr.map(x => ({ ...x, status: 'default' })),
            explanation: 'Initial unsorted product array for Quick Sort.',
            comparisons: 0,
            swaps: 0,
            status: 'Initialized'
        });

        function partition(low, high) {
            const pivotIndex = high;
            const pivotValue = arr[pivotIndex].price;

            trace.push({
                arr: arr.map((x, idx) => ({
                    ...x,
                    status: idx === pivotIndex ? 'pivot' : (idx >= low && idx < high ? 'range' : 'default')
                })),
                explanation: `Chosen pivot: ₹${pivotValue.toLocaleString()} at index ${pivotIndex}.`,
                comparisons,
                swaps,
                status: 'Pivot Selected'
            });

            let i = low - 1;
            for (let j = low; j < high; j++) {
                comparisons++;
                trace.push({
                    arr: arr.map((x, idx) => ({
                        ...x,
                        status: idx === pivotIndex ? 'pivot' : (idx === j || idx === i + 1 ? 'comparing' : (idx >= low && idx < high ? 'range' : 'default'))
                    })),
                    explanation: `Comparing element ₹${arr[j].price.toLocaleString()} with pivot ₹${pivotValue.toLocaleString()}`,
                    comparisons,
                    swaps,
                    status: 'Partition Scan'
                });

                if (arr[j].price < pivotValue) {
                    i++;
                    if (i !== j) {
                        const temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                        swaps++;

                        trace.push({
                            arr: arr.map((x, idx) => ({
                                ...x,
                                status: idx === pivotIndex ? 'pivot' : (idx === i || idx === j ? 'swapped' : (idx >= low && idx < high ? 'range' : 'default'))
                            })),
                            explanation: `Swapped smaller element ₹${arr[i].price.toLocaleString()} with ₹${arr[j].price.toLocaleString()}`,
                            comparisons,
                            swaps,
                            status: 'Swapping Elements'
                        });
                    }
                }
            }

            const temp = arr[i + 1];
            arr[i + 1] = arr[high];
            arr[high] = temp;
            swaps++;

            trace.push({
                arr: arr.map((x, idx) => ({
                    ...x,
                    status: idx === i + 1 ? 'sorted' : (idx >= low && idx <= high ? 'range' : 'default')
                })),
                explanation: `Placed pivot ₹${pivotValue.toLocaleString()} in its final sorted position at index ${i + 1}.`,
                comparisons,
                swaps,
                status: 'Pivot Positioned'
            });

            return i + 1;
        }

        function quickSortRec(low, high) {
            if (low < high) {
                const pi = partition(low, high);
                quickSortRec(low, pi - 1);
                quickSortRec(pi + 1, high);
            }
        }

        quickSortRec(0, arr.length - 1);

        trace.push({
            arr: arr.map(x => ({ ...x, status: 'sorted' })),
            explanation: 'Quick Sort complete! Entire product catalog is ordered in O(n log n) average time.',
            comparisons,
            swaps,
            status: 'Sorted'
        });

        return trace;
    }

    function generateBinarySearchSteps(items, target) {
        const trace = [];
        // Binary search requires pre-sorted data
        const sorted = [...items].sort((a, b) => a.price - b.price);
        let low = 0;
        let high = sorted.length - 1;
        let comparisons = 0;
        let found = false;

        trace.push({
            arr: sorted.map(x => ({ ...x, status: 'default' })),
            explanation: `Pre-sorted array by price. Commencing Binary Search for target ₹${target.toLocaleString()}.`,
            comparisons: 0,
            swaps: 0,
            status: 'Initialized'
        });

        while (low <= high) {
            comparisons++;
            const mid = Math.floor((low + high) / 2);
            const midPrice = sorted[mid].price;

            trace.push({
                arr: sorted.map((x, idx) => {
                    if (idx === mid) return { ...x, status: 'pivot' };
                    if (idx >= low && idx <= high) return { ...x, status: 'range' };
                    return { ...x, status: 'default' };
                }),
                explanation: `Step ${comparisons}: Low=#${low}, Mid=#${mid} (₹${midPrice.toLocaleString()}), High=#${high}`,
                comparisons,
                swaps: 0,
                status: 'Evaluating Mid'
            });

            if (midPrice === target) {
                found = true;
                trace.push({
                    arr: sorted.map((x, idx) => ({
                        ...x,
                        status: idx === mid ? 'sorted' : 'default'
                    })),
                    explanation: `TARGET FOUND! Product '${sorted[mid].name}' matches exact price ₹${target.toLocaleString()} in ${comparisons} comparison(s)!`,
                    comparisons,
                    swaps: 0,
                    status: 'Match Found'
                });
                break;
            } else if (target < midPrice) {
                trace.push({
                    arr: sorted.map((x, idx) => {
                        if (idx >= low && idx < mid) return { ...x, status: 'range' };
                        return { ...x, status: 'default' };
                    }),
                    explanation: `Target ₹${target.toLocaleString()} < Mid ₹${midPrice.toLocaleString()} → Discarding right half [${mid}..${high}], searching left.`,
                    comparisons,
                    swaps: 0,
                    status: 'Searching Left'
                });
                high = mid - 1;
            } else {
                trace.push({
                    arr: sorted.map((x, idx) => {
                        if (idx > mid && idx <= high) return { ...x, status: 'range' };
                        return { ...x, status: 'default' };
                    }),
                    explanation: `Target ₹${target.toLocaleString()} > Mid ₹${midPrice.toLocaleString()} → Discarding left half [${low}..${mid}], searching right.`,
                    comparisons,
                    swaps: 0,
                    status: 'Searching Right'
                });
                low = mid + 1;
            }
        }

        if (!found) {
            trace.push({
                arr: sorted.map(x => ({ ...x, status: 'default' })),
                explanation: `Search finished. Target price ₹${target.toLocaleString()} is not in the catalog after ${comparisons} logarithmic step(s).`,
                comparisons,
                swaps: 0,
                status: 'Not Found'
            });
        }

        return trace;
    }

    // ==========================================
    // RENDER BARS TO STAGE
    // ==========================================

    function renderStep(index) {
        if (!steps || steps.length === 0) return;
        currentStepIndex = Math.max(0, Math.min(index, steps.length - 1));
        const step = steps[currentStepIndex];

        // Find max price for relative scaling
        const maxPrice = Math.max(...step.arr.map(x => x.price), 100000);
        const stageHeight = stage.clientHeight - 80 || 280;

        stage.innerHTML = '';

        step.arr.forEach((item, idx) => {
            const barWrapper = document.createElement('div');
            barWrapper.className = 'd-flex flex-column align-items-center justify-content-end';
            barWrapper.style.flex = '1';
            barWrapper.style.maxWidth = '60px';
            barWrapper.style.height = '100%';

            // Calculate height percent
            const heightPx = Math.max(35, Math.round((item.price / maxPrice) * stageHeight));

            // Determine status style
            let bgClass = 'bg-secondary-subtle border';
            let labelBadge = '';
            if (item.status === 'comparing') {
                bgClass = 'bg-warning text-dark border-warning shadow-sm';
                labelBadge = '<span class="badge bg-warning text-dark px-1" style="font-size:0.6rem">CMP</span>';
            } else if (item.status === 'swapped') {
                bgClass = 'bg-danger text-white border-danger shadow-sm';
            } else if (item.status === 'pivot') {
                bgClass = 'bg-info text-dark border-info shadow-sm';
                labelBadge = '<span class="badge bg-info text-dark px-1" style="font-size:0.6rem">MID</span>';
            } else if (item.status === 'range') {
                bgClass = 'bg-primary-subtle text-primary border-primary';
            } else if (item.status === 'sorted') {
                bgClass = 'bg-success text-white border-success shadow-sm';
                labelBadge = '<span class="badge bg-success px-1" style="font-size:0.6rem">✓</span>';
            }

            // Price text
            const priceFormatted = `₹${(item.price >= 1000 ? (item.price/1000).toFixed(0) + 'k' : item.price)}`;

            barWrapper.innerHTML = `
                <div class="small fw-bold mb-1 text-truncate text-center" style="font-size: 0.65rem; max-width: 55px;" title="${item.name}">
                    ${labelBadge || priceFormatted}
                </div>
                <div class="visualizer-bar ${bgClass} rounded-top-3 w-100 transition-all" 
                     style="height: ${heightPx}px; transition: height 0.3s ease, background-color 0.2s ease;">
                </div>
                <div class="text-muted mt-1 small font-monospace" style="font-size: 0.65rem;">
                    #${idx}
                </div>
            `;
            stage.appendChild(barWrapper);
        });

        // Update indicators
        progressBadge.textContent = `Step ${currentStepIndex + 1} of ${steps.length}`;
        explanationText.textContent = step.explanation;
        compCounter.textContent = step.comparisons;
        swapCounter.textContent = step.swaps;
        statusText.textContent = `Status: ${step.status}`;
    }

    // ==========================================
    // INITIALIZATION & EVENT HANDLERS
    // ==========================================

    function resetVisualization() {
        pause();
        currentStepIndex = 0;
        baseItems = generateInitialData(dataSize);

        if (currentAlgorithm === 'merge_sort') {
            steps = generateMergeSortSteps(baseItems);
            algoBadge.textContent = 'Merge Sort';
            complexityDisplay.textContent = 'O(n log n)';
            infoBox.innerHTML = `
                <p><strong>Divide and Conquer Paradigm:</strong> Merge Sort divides the array into two halves of size \\( n/2 \\), recursively sorts each half, and combines them in \\( O(n) \\) linear time.</p>
                <p><strong>Recurrence Relation:</strong> \\( T(n) = 2T(n/2) + O(n) \\). By Master Theorem Case 2, \\( T(n) = \\Theta(n \\log n) \\).</p>
            `;
        } else if (currentAlgorithm === 'quick_sort') {
            steps = generateQuickSortSteps(baseItems);
            algoBadge.textContent = 'Quick Sort';
            complexityDisplay.textContent = 'O(n log n) avg';
            infoBox.innerHTML = `
                <p><strong>Partitioning Around a Pivot:</strong> Quick Sort selects a pivot value and partitions the product array so all items with price smaller than the pivot appear before items with greater price.</p>
                <p><strong>Recurrence:</strong> Best/Average: \\( T(n) = 2T(n/2) + O(n) = O(n \\log n) \\). Worst case: \\( T(n) = T(n-1) + O(n) = O(n^2) \\) (mitigated by balanced pivot selection).</p>
            `;
        } else if (currentAlgorithm === 'binary_search') {
            const targetVal = parseFloat(targetInput.value) || 25000;
            steps = generateBinarySearchSteps(baseItems, targetVal);
            algoBadge.textContent = 'Binary Search';
            complexityDisplay.textContent = 'O(log n)';
            infoBox.innerHTML = `
                <p><strong>Halving the Search Array:</strong> Binary Search compares the target price to the median item at index \\( \\lfloor(low + high)/2\\rfloor \\). Halves the remaining range at every step.</p>
                <p><strong>Recurrence:</strong> \\( T(n) = T(n/2) + O(1) \\). By Master Theorem, \\( T(n) = O(\\log n) \\). Requires pre-sorted array.</p>
            `;
        }

        renderStep(0);
    }

    function play() {
        if (isPlaying) return;
        isPlaying = true;
        playIcon.className = 'bi bi-pause-fill me-1';
        playText.textContent = 'Pause';

        playInterval = setInterval(() => {
            if (currentStepIndex < steps.length - 1) {
                renderStep(currentStepIndex + 1);
            } else {
                pause();
            }
        }, speedMs);
    }

    function pause() {
        isPlaying = false;
        if (playInterval) {
            clearInterval(playInterval);
            playInterval = null;
        }
        playIcon.className = 'bi bi-play-fill me-1';
        playText.textContent = 'Play';
    }

    function stepForward() {
        pause();
        if (currentStepIndex < steps.length - 1) {
            renderStep(currentStepIndex + 1);
        }
    }

    function stepBackward() {
        pause();
        if (currentStepIndex > 0) {
            renderStep(currentStepIndex - 1);
        }
    }

    // Listeners
    algoSelect.addEventListener('change', (e) => {
        currentAlgorithm = e.target.value;
        if (currentAlgorithm === 'binary_search') {
            targetPriceGroup.classList.remove('d-none');
            dataSizeGroup.classList.add('d-none');
        } else {
            targetPriceGroup.classList.add('d-none');
            dataSizeGroup.classList.remove('d-none');
        }
        resetVisualization();
    });

    sizeSelect.addEventListener('change', (e) => {
        dataSize = parseInt(e.target.value, 10);
        resetVisualization();
    });

    speedSelect.addEventListener('change', (e) => {
        speedMs = parseInt(e.target.value, 10);
        if (isPlaying) {
            pause();
            play();
        }
    });

    targetInput.addEventListener('change', () => {
        if (currentAlgorithm === 'binary_search') {
            resetVisualization();
        }
    });

    playBtn.addEventListener('click', () => {
        if (isPlaying) pause();
        else play();
    });

    stepFwdBtn.addEventListener('click', stepForward);
    if (stepBackBtn) stepBackBtn.addEventListener('click', stepBackward);
    resetBtn.addEventListener('click', resetVisualization);

    // Initial boot
    resetVisualization();
})();
