<script>
	export let posts;
</script>

<!-- <script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/api/posts.json');
		if (res.ok) {
			const { posts } = await res.json();
			return { props: { posts } };
		}
	};
</script> -->

<svelte:head>
	<title>Mike's Blog</title>
</svelte:head>

{#each posts as { title, slug, excerpt, coverImage, date, tags }}
	<main class="mx-auto px-4 py-8 center">
		<div class="card text-center shadow-2xl">
			<figure class="px-10 pt-10 ">
				<img class="rounded-xl " src={coverImage.url} alt={`Cover image for ${title}`} />
			</figure>
			<div class="card-body">
				<h1 class="title">{title}</h1>
				<p>{excerpt}</p>
				<div class="flex justify-center mt-5 space-x-2">
					{#each tags as tag}
						<div class="badge badge-primary">{tag}</div>
					{/each}
				</div>
				<div class="justify-center card-actions">
					<a href={`/blog/${slug}`} class="btn btn-primary btn-outline">Read &rArr</a>
				</div>
			</div>
		</div>
	</main>
{/each}

<style lang="scss">
	:global(.center > *) {
		--gap: 1rem;
		--mw: 50rem;

		width: 100%;
		max-width: var(--mw);
		margin-left: auto;
		margin-right: auto;
		padding-left: var(--gap);
		padding-right: var(--gap);
	}
	:global(.center > .exception-1) {
		max-width: none;
	}
	:global(.center > .exception-2) {
		// max-width: minmax( 50rem, 100%);
		// min-width: max( 50rem, 100vw);
		max-width: min( 100%, 50rem);
		padding-left: 0;
		padding-right: 0;
	}
</style>
