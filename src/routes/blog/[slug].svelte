<script context="module">
	export const load = async ({ fetch, page: { params } }) => {
		const { slug } = params;
		const res = await fetch(`/blog/${slug}.json`);
		console.log(`🚀 ~ file: [slug].svelte ~ line 5 ~ load ~ res`, res);
		if (res.ok) {
			const { post } = await res.json();
			console.log(`🚀 ~ file: [slug].svelte ~ line 8 ~ load ~ post`, post);
			return { props: { post } };
		}
	};
</script>

<script>
	// import Posts from "$components/Posts.svelte";
	export let post;
	const {
		title,
		date,
		tags,
		article: { html },
		coverImage
	} = post;
	// author: { name, authorTitle, picture },
	// 		content: { html },
	import Icon from '@iconify/svelte';

	const icons = {
		fire1: 'wi:fire',
		fire2: 'vaadin:fire',
		fire3: 'mdi:fire',
		fire4: 'fa:fire',
		fire5: 'fa5:fire',
		fire6: 'fa5:fire-alt',
		fire7: 'el:fire',
		fire8: 'eva:fire',
        arrowCircle1: 'bi:arrow-down-circle-fill',
        arrowCircle2: 'eva:arrow-circle-down-fill',
	};
</script>

<svelte:head>
	<title>Mike's Blog</title>
</svelte:head>

<div
	class="main center flex flex-col content-start items-center px-3 pb-3 md:px-10 md:pb-10 lg:px-20 lg:pb-20 xl:px-48 xlpb-48"
>
<div class="post-title mt-8">
        <a href="/blog" class="text-sky-500/[0.5] transition-all rounded-xl w-0">
            <Icon icon={icons.arrowCircle2}  class="w-12 h-12 -ml-2 mb-2 transition:all duration-200 hover:rotate-90 hover:text-sky-500" />
        </a>
		<!-- <div class="sm:-mx-5 md:-mx-10 lg:-mx-20 xl:-mx-38 mb-5 rounded-xl">
                <img src={post.coverImage.url} alt={`Cover image for ${title}`} />
            </div> -->
		<p class="text-gray-400  font-mono  text-base tracking-widest font-semibold">
			{new Date(date).toDateString()}
		</p>
		<h1 class="text-5xl mt-2 text-left tracking-tight font-bold font-display">
			{title}
			<!-- text-warm2-200/[0.95] text-emerald-400 text-violet-400 text-limegreens-900/[0.75] -->
			<!-- {author.picture.url} -->
		</h1>
	</div>
	 <!-- <a href="/" class="flex items-center mt-10">
        <img
            src={picture.url}
            alt={name}
            class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
        />
        <span class="flex-grow flex flex-col pl-4">
            <span class="title-font font-medium">{name}</span>
            <span class="text-secondary text-xs tracking-widest mt-0 5">{authorTitle}</span>
        </span>
    </a> -->
    {#if tags}
        <div class="mt-5 space-x-2">
            {#each tags as tag}
                <span class="px-2 py-1 rounded bg-sky-900/[0.5] text-sky-400/[0.5]">{tag}</span>
            {/each}
        </div>
    {/if}

	<article class=" text-winterblues-900 text-xl pb-12">
		{@html html}
		<!-- {content}  -->
		<!-- <div class="text-8xl flex items-center justify-center w-full">
			<div class="text-winterblues-700">~</div>
		</div> -->
		<div
			class="text-8xl test pt-10 bg-gradient-to-br from-yellow-400 via-amber-700 to-rose-600 bg-clip-text  flex items-center justify-center w-full"
		>
			<!-- <p class="text-transparent">This is a test</p> -->
			<svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
				<linearGradient id="my-cool-gradient" x2="1" y2="1">
					<stop offset="0%" stop-color="#447799" />
					<stop offset="50%" stop-color="#224488" />
					<stop offset="100%" stop-color="#112266" />
				</linearGradient>
			</svg>

			<svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
				<linearGradient id="gradient-fire" x2="1" y2="1">
					<stop offset="0%" stop-color="var(--color-yellow-500)" />
					<stop offset="15%" stop-color="var(--color-warm2-700)" />
					<stop offset="50%" stop-color="var(--color-amber-400)" />
					<stop offset="35%" stop-color="var(--color-yellow-500)" />
					<stop offset="75%" stop-color="var(--color-rose-700)" />
					<stop offset="80%" stop-color="var(--color-yellow-500)" />
					<stop offset="100%" stop-color="var(--color-warm2-300)" />
					<!-- <stop offset="25%" stop-color="var(--color-fuchsia-200)" /> -->
				</linearGradient>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
				role="img"
				width="1em"
				height="1em"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 1200 1200"
				id="fire-1"
				><path
					d="M381.64 1200C135.779 1061.434 71.049 930.278 108.057 751.148c27.321-132.271 116.782-239.886 125.36-371.903c38.215 69.544 54.183 119.691 58.453 192.364C413.413 422.695 493.731 216.546 498.487 0c0 0 316.575 186.01 337.348 466.98c27.253-57.913 40.972-149.892 13.719-209.504c81.757 59.615 560.293 588.838-64.818 942.524c117.527-228.838 30.32-537.611-173.739-680.218c13.628 61.319-10.265 290.021-100.542 390.515c25.014-167.916-23.8-238.918-23.8-238.918s-16.754 94.054-81.758 189.065c-59.36 86.762-100.49 178.847-23.257 339.556z"
				/></svg
			>
			<!-- <Icon
				class="test"
				fill="#f00"
				color="fill: url(#my-cool-gradient) #333;"
				icon={icons.fire1}
			/> -->
		</div>
	</article>
</div>

<style global lang="scss">
	@import '../../prose.scss';

	.center > * {
		--gap: 1rem;
		--mw: 50rem;

		width: 100%;
		max-width: var(--mw);
		margin-left: auto;
		margin-right: auto;
		padding-left: var(--gap);
		padding-right: var(--gap);
	}
	.center > .exception-1 {
		max-width: none;
	}
	.center > .exception-2 {
		// max-width: minmax( 50rem, 100%);
		// min-width: max( 50rem, 100vw);
		max-width: min(100%, 50rem);
		padding-left: 0;
		padding-right: 0;
	}

	:global(#fire-gradient-1) {
		--fire-1-offset-1: 0%;
		--fire-1-stop-1: var(--color-yellow-300);
		--fire-1-offset-2: 25%;
		--fire-1-stop-2: var(--color-amber-300);
		--fire-1-offset-3: 60%;
		--fire-1-stop-3: var(--color-rose-300);
		--fire-1-offset-4: 100%;
		--fire-1-stop-4: var(--color-yellow-100);
	}

	:global(#fire-1) {
		fill: url(#gradient-fire) #333;
	}
</style>
