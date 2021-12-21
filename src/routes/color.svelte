<script context="module">
// import colors from '$lib/color.js'
// console.log(`🚀 ~ file: color.svelte ~ line 4 ~ colors`, colors)
</script>

<script>
import generate from "$lib/generate.js";
console.log(`🚀 ~ file: color.svelte ~ line 8 ~ generate`, generate)
// 
// console.log(`🚀 ~ file: color.svelte ~ line 3 ~ color`, color)

const params = {
  specs: {
    // Number of colors
    steps: 10,
    // Hue Start Value (0 - 359)
    hue_start: 140,
    // Hue End Value (0 - 359)
    hue_end: 240,
    // Hue Curve (See Curves Section)
    hue_curve: "easeInQuad",
    // Saturation Start Value (0 - 100)
    sat_start: 10,
    // Saturation End Value (0 - 100)
    sat_end: 100,
    // Saturation Curve (See Curves Section)
    sat_curve: "easeOutQuad",
    // Saturation Rate (0 - 200)
    sat_rate: 200,
    // Luminosity Start Value (0 - 100)
    lum_start: 100,
    // Luminosity End Value (0 - 100)
    lum_end: 100,
    // Luminosity Curve (See Curves Section)
    lum_curve: "easeOutQuad",
    // Modifier Scale
    // Every generated color gets a modifier (label) that
    // indicates its lightness. A value of 10 results in
    // two-digit modifiers. The lightest color will be 0 (e.g. Red 0)
    // and the darkest color will be 100 (e.g. Red 100), given
    // that you generate 11 colors
    modifier: 10
  }
};


let hexarray_deepReds = ["03071e","370617","6a040f","9d0208","d00000","dc2f02","e85d04","f48c06","faa307","ffba08"]
let hexarray_winterBlues = ["03045e","023e8a","0077b6","0096c7","00b4d8","48cae4","90e0ef","ade8f4","caf0f8"]
let hexarray_limeGreens = ["004b23","006400","007200","008000","38b000","70e000","9ef01a","ccff33"]

let processedArray_reds = []
let processedArray_blues = []
let processedArray_greens = []

let allColors = [hexarray_deepReds, hexarray_winterBlues, hexarray_limeGreens]
allColors = allColors.map(arr => arr.map(color => `#${color}`))

let opts = {
    provideInverted: true
}
let colors = generate(params);
colors = colors.map(c => c.hex)
allColors.push(colors)
console.log(`🚀 ~ file: color.svelte ~ line 64 ~ allColors`, allColors)
console.log(`🚀 ~ file: color.svelte ~ line 24 ~ colors `, colors )



</script>

<svelte:head>
<title>About MetaBrain</title>

</svelte:head>
<div class="main p-12 inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
    <h1>Color</h1>
    <h2 class="cyan-500 text-3xl">I'm colorful</h2>
</div>
<div class="flex flex-col pt-10">
    <h2>There are links to click. If you want.</h2>
</div>

<div class="grid">{#each colors as color}
    <div class="card w-12 h-12" style="background: {color.hex}"></div>
{/each}</div>

<div class="grid flow-y">
    {#each allColors as colorsArray}
<div class="flex">
    
        {#each colorsArray as color}
            <div class="card w-12 h-12 p-12 rounded-none" style="background: {color};"></div>
        {/each}
</div>

    {/each}
</div>

<style>

</style>