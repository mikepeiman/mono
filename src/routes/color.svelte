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
    steps: 11,
    // Hue Start Value (0 - 359)
    hue_start: 40,
    // Hue End Value (0 - 359)
    hue_end: 240,
    // Hue Curve (See Curves Section)
    hue_curve: "easeInQuad",
    // Saturation Start Value (0 - 100)
    sat_start: 4,
    // Saturation End Value (0 - 100)
    sat_end: 90,
    // Saturation Curve (See Curves Section)
    sat_curve: "easeOutQuad",
    // Saturation Rate (0 - 200)
    sat_rate: 130,
    // Luminosity Start Value (0 - 100)
    lum_start: 100,
    // Luminosity End Value (0 - 100)
    lum_end: 53,
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

let opts = {
    provideInverted: true
}
let colors = generate(params);
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

<style>

</style>