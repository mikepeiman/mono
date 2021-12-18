<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('../posts.json');
		// console.log(`🚀 ~ file: posts index.svelte ~ line 4 ~ load ~ res`, res)
		if (res.ok) {
			const { posts } = await res.json();
			return { props: { posts } };
		}
	};
</script>

<script>
	import Time from 'svelte-time';
	import Posts from '$components/Posts.svelte';
	export let posts;
	let selectedPosts = posts?.slice(0, 3);
	console.log(`🚀 ~ file: index.svelte ~ line 4 ~ posts`, posts);
	let projects = [
		{
			name: 'Project One',
			tags: ['awesome', 'sauce', 'hot'],
			desc: 'This project will burn your socks off'
		},
		{
			name: 'Project Two',
			tags: ['mysterious', 'fun', 'cool'],
			desc: 'This project will cool your noggin'
		},
		{
			name: 'Project Three',
			tags: ['scary', 'epic', 'twisted'],
			desc: 'This project will twist your knickers'
		}
	];
</script>

<main class="center">
	<section class="articles flex flex-row">
		<div class="intro py-12 m-3 w-1/2 prose prose-lg">
			<h1>Hi, I'm Mike.</h1>
			<p>I'm a creative and visionary software developer, and this is my professional blog.</p>
            <ol>
                <li>This is one.</li>
                <li>This is two.</li>
                <li>This is three.</li>
            </ol>
		</div>
		<div class="posts py-12 w-1/2">
			{#each selectedPosts as post}
				<div class="card shadow-sm shadow-sky-200 m-3 card-body prose">
					<div class="p-0 m-0">
                        <Time timestamp={post.date} />
                    </div>
					<p ckass="text-xl">{post.title}</p>
					<p class="m-0">{post.excerpt}</p>
				</div>
			{/each}
		</div>

	</section>
    <section class="flex m-6">
        <div class="text-grey-200 text-2xl bold italic prose">
            Truth, freedom, health, wisdom, goodness: I'm dedicated to these things, and actively trying
            to contribute to a society that embodies them more fully.
        </div>
    </section>
	<section class="projects">
		<h2 class="uppercase">Selected Projects</h2>
		<div class="card card-shadow flex flex-row">
			{#each projects as project}
				<div class="card p-6 bg-teal-900 m-3 rounded-md prose">
					<div class="flex flex-row">
                        {#each project.tags as tag}
                            <span class="mx-2 bg-slate-900 rounded-md py-1 px-2">{tag}</span>
                        {/each}
                    </div>
					<h2 class="my-6">{project.name}</h2>
					<p>{project.desc}</p>
				</div>
			{/each}
		</div>
	</section>
</main>
