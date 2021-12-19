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

<main class="center max-w-none 2xl:w-3/4 w-full mt-24">
	<section class="articles flex flex-row p-3 pt-12 border-t-2 border-emerald-300">
		<div class="intro w-3/5 pr-24">
			<h1 class="font-semibold text-5xl">Hi, I'm Mike.</h1>
			<p class="intro-body text-xl">
				I'm a creative software developer, and this is my professional blog. I love
				<span class="text-highlight">user experience</span> and design that helps realize human
				potential. I follow a <span class="text-highlight">first-principles</span>
				approach in my life and my work. Here are a few of my design principle:
			</p>
			<ol class="ml-7 mt-6">
				<li class="mt-4">
					<span class="li-heading">Never deny the user basic options.</span>
					<p class="li-snippet">
						Users should be provided the means to customize the user interface as much as possible.
					</p>
				<li class="mt-4">
					<span class="li-heading">Minimize barriers to action.</span>
					<p class="li-snippet">
						The app is <span class="italic">for</span> something. Make it as intuitive and efficient
						as possible to <span class="italic">do that thing.</span>
					</p>
				</li>
				<li class="mt-4">
					<span class="li-heading">Leverage visual intelligence.</span>
					<p class="li-snippet">
						Augment words and iconography with color and structure - draw the eye to key points and
						relationships. Effectively use negative space, layout and structure, diagrams and
						images.
					</p>
				</li>
			</ol>
		</div>
		<div class="posts w-2/5 not-prose flex flex-col">
			<div class="posts-panel">
				<h2 class="uppercase ml-3 -mt-2 mb-3 text-emerald-200">Recent posts</h2>
				{#each selectedPosts as post}
					<div class="post-card card bg-sky-500 bg-opacity-25 mx-3 mb-4 card-body rounded-md">
						<div class="article-date p-0 m-0 text-sm font-light">
							<Time timestamp={post.date} />
						</div>
						<h3 class="text-xl mb-3 -mt-1 font-bold text-white text-3xl">{post.title}</h3>
						<p class="text-sm font-light">{post.excerpt}</p>
					</div>
				{/each}
			</div>
			<span class="view-more text-right  pr-4 "
				><a href="/posts" class="offset-4 decoration-2 decoration-sky-500 text-sky-500 hover:decoration-2 hover:decoration-white transition-all"
					>View more articles
				</a>
				<span class="text-sky-700 font-bold m-0 p-0">&#62</span>
				<span class="text-sky-500 font-bold -ml-2 p-0">&#62</span>
				<span class="text-sky-700 font-bold -ml-2 p-0">&#62</span>
			</span>
		</div>
	</section>
	<section class="statement flex m-6 items-center justify-center">
		<p class="text-sky-500 text-3xl font-black text-center p-6 rounded-lg w-2/3 self-center">
			&ldquo;Truth, freedom, health, wisdom, goodness: I'm dedicated to these things, and actively
			trying to contribute to a society that embodies them more fully.&rdquo;
		</p>
	</section>
	<section class="projects-group flex flex-col justify-center w-full">
		<h2 class="uppercase ml-3 text-emerald-200">Selected Projects</h2>
		<div class="projects grid w-full">
			{#each projects as project}
				<div class="card p-6 bg-sky-500 bg-opacity-25 m-3 rounded-md">
					<div class="flex flex-col">
						<h2 class="text-2xl font-extrabold">{project.name}</h2>
						<p class="mt-2 text-sm font-light">{project.desc}</p>
						<div class="mt-4 flex flex-row">
							{#each project.tags as tag}
								<span
									class="project-tag -ml-2 mr-4 bg-slate-900 rounded-md text-sm font-thin py-1 px-2"
									>{tag}</span
								>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>
</main>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Allura&family=Bad+Script&family=Coda:wght@400;800&family=Dancing+Script&family=Forum&family=Gideon+Roman&family=Great+Vibes&family=Karla:ital,wght@0,200;0,300;1,200;1,300&family=Lemonada:wght@300;400;500&family=Lobster&family=Merriweather:ital,wght@0,300;1,300&family=Monoton&family=Montserrat:ital,wght@0,100;0,300;0,500;0,800;1,100;1,300;1,500;1,800&family=Outfit:wght@200;500&family=Overlock:ital,wght@0,400;0,700;1,400;1,700&family=Staatliches&display=swap');

	.intro {
		font-family: 'Montserrat', sans-serif;
		// font-family: 'Overlock', cursive;
		// font-family: 'Merriweather', serif;
	}
	.intro-body {
		font-family: 'Montserrat', sans-serif;
		@apply mt-3 font-light;
	}
	.text-highlight {
		font-family: 'Montserrat', sans-serif;
		@apply mt-3 font-medium text-sky-500 italic;
	}

	a {
		@apply underline underline-offset-4  decoration-sky-500;
	}

	.post-card {
		h3 {
			color: white;
			font-size: 1.5rem;
		}
	}

	ol {
		font-family: 'Merriweather', serif;
		--list-counter-size: 1.5rem;
		counter-reset: intro-counter;
		list-style: none;
		li {
			counter-increment: intro-counter;
			position: relative;
			&::marker {
				content: counter(intro-counter) '. ';
				color: var(--color-sky-500);
				font-weight: 700;
				position: absolute;
				top: 0;
				left: calc(-1 * var(--list-counter-size) - 2rem);
				font-size: var(--list-counter-size);
			}
			.li-heading {
				// font-family: 'Montserrat', sans-serif;
				@apply font-black italic text-xl ml-3 opacity-100 text-emerald-200;
			}
			.li-snippet {
				font-family: 'Montserrat', sans-serif;
				@apply mt-3 font-light ml-3;
			}
		}
	}

	.statement {
		// font-family: 'Bad Script', cursive;
		// font-family: 'Coda', cursive;
		// font-family: 'Forum', cursive;
		// font-family: 'Gideon Roman', cursive;
		// font-family: 'Karla', sans-serif;
		// font-family: 'Merriweather', serif;
		// font-family: 'Montserrat', sans-serif;
		font-family: 'Outfit', sans-serif;
		// font-family: 'Overlock', cursive;
		// font-family: 'Staatliches', cursive;
	}
	.article-date {
		font-family: monospace;
	}
	.projects-group {

		// font-family: 'Montserrat', sans-serif;
	}
	.projects {
		grid-template-columns: repeat(3, 1fr);
	}

	.project-tag {
		font-family: monospace;
	}
</style>
