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
	import Posts from '$components/Posts.svelte';
	export let posts;
    let selectedPosts = posts?.slice(0,3)
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
	<section class="articles">
		<div class="posts py-12">
			{#each selectedPosts as post}
                 <div class="card shadow card-body">
                     {post.date}
                     {post.title}
                    
                    
                    </div>
            {/each}
		</div>
		<div class="text-grey-200 text-2xl bold italic py-3">
			Truth, freedom, health, wisdom, goodness: I'm dedicated to these things, and actively trying
			to contribute to a society that embodies them more fully.
		</div>

		<section class="tiles panel flex">
			<h2 class="uppercase">Selected Projects</h2>
			{#each projects as project}
				<div class="card p-4 bg-teal-900 m-3 rounded-md">
					{#each project.tags as tag}
						<span>{tag}</span>
					{/each}

					<h2>{project.name}</h2>
					<p>{project.desc}</p>
				</div>
			{/each}
		</section>
	</section>
</main>
