<script context="module">
	export const load = async ({ fetch, page: { params } }) => {
		const { slug } = params;
		const res = await fetch(`/blog/${slug}.json`);
		if (res.ok) {
			const { post } = await res.json();
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
		author: { name, authorTitle, picture },
		content: { html },
		coverImage
	} = post;
</script>

<svelte:head>
	<title>Mike's Blog</title>
</svelte:head>

<div class="center flex flex-col content-start items-center px-5 pb-5 md:px-10 md:pb-10 lg:px-20 lg:pb-20 xl:px-48 xlpb-48">
    <!-- <div class="sm:-mx-5 md:-mx-10 lg:-mx-20 xl:-mx-38 mb-5 rounded-xl">
        <img src={post.coverImage.url} alt={`Cover image for ${title}`} />
    </div> -->
    <p class="text-gray-400 mt-20  text-xs tracking-widest font-semibold">{new Date(date).toDateString()}</p>
    <h1 class="text-5xl mt-2 text-left tracking-tight  text-winterblues-700 font-bold font-display">
        {title}
        <!-- text-warm2-200/[0.95] text-emerald-400 text-violet-400 text-limegreens-900/[0.75] -->
        <!-- {author.picture.url} -->
    </h1>
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
    </a>
    {#if tags}
        <div class="mt-5 space-x-2">
            {#each tags as tag}
                <span class="badge badge-primary">{tag}</span>
            {/each}
        </div>
    {/if} -->
    
    <article class="mt-10 text-winterblues-900 prose">
        {@html html}
    </article>
</div>


<style lang="scss">
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
		max-width: min( 100%, 50rem);
		padding-left: 0;
		padding-right: 0;
	}
</style>
