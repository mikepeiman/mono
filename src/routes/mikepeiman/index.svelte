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

<main class="center prose md:prose-md lg:prose-lg max-w-none 2xl:w-3/4 w-full mt-24">
	<section class="articles flex flex-row p-3 border border-t-2 border-sky-300">
		<div class="intro w-1/2">
			<h1>Hi, I'm Mike.</h1>
			<p>
				I'm a creative and visionary software developer, and this is my professional blog. I love
				user experience and design that helps realize human potential. I follow a first-principles
				approach in my life and my work. In software design:
			</p>
			<ol class="not-prose opacity-100">
				<li class="">
					<span class="li-heading">Never deny the user basic options.</span>
					<p class="li-snippet">
						Users should be provided the means to customize the user interface as much as possible.
					</p>
				</li>
				<li>
					<span class="li-heading">Minimize barriers to action.</span>
					<p class="li-snippet">
						Users should be provided the means to customize the user interface as much as possible.
					</p>
				</li>
				<li>
					<span class="li-heading">Leverage visual intelligence.</span>
					<p class="li-snippet">
						Users should be provided the means to customize the user interface as much as possible.
					</p>
				</li>
			</ol>
		</div>
		<div class="posts w-1/2 not-prose flex flex-col">
			<div class="posts-panel">
				{#each selectedPosts as post}
					<div class="card bg-sky-900 bg-opacity-50 mx-3 mb-4 card-body">
						<div class="article-date p-0 m-0 text-sm font-light">
							<Time timestamp={post.date} />
						</div>
						<h3 class="text-xl my-2">{post.title}</h3>
						<p class="text-sm font-light">{post.excerpt}</p>
					</div>
				{/each}
			</div>
			<span class="view-more text-right  pr-4 "
				><a href="/posts" class="decoration-dashed offset-2 decoration-2 decoration-sky-500"
					>View more articles
				</a>
				<span class="text-sky-700 font-bold m-0 p-0">&#62</span>
				<span class="text-sky-500 font-bold -ml-2 p-0">&#62</span>
				<span class="text-sky-700 font-bold -ml-2 p-0">&#62</span>
			</span>
		</div>
	</section>
	<section class="statement flex m-6 items-center justify-center">
		<p class="text-grey-200 text-3xl font-black text-center p-6 rounded-lg w-2/3 self-center">
			&ldquo;Truth, freedom, health, wisdom, goodness: I'm dedicated to these things, and actively
			trying to contribute to a society that embodies them more fully.&rdquo;
		</p>
	</section>
	<section class="projects-group flex flex-col justify-center not-prose">
		<h2 class="uppercase ml-3">Selected Projects</h2>
		<div class="projects grid  w-full">
			{#each projects as project}
				<div class="card p-6 bg-sky-900 bg-opacity-50 m-3 rounded-md">
					<div class="flex flex-row">
						{#each project.tags as tag}
							<span
								class="project-tag -ml-2 mr-4 bg-slate-900 rounded-md text-sm font-thin py-1 px-2"
								>{tag}</span
							>
						{/each}
					</div>
					<h2 class="my-3 text-xl font-black">{project.name}</h2>
					<p class="text-sm font-light">{project.desc}</p>
				</div>
			{/each}
		</div>
	</section>
</main>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Allura&family=Bad+Script&family=Coda:wght@400;800&family=Dancing+Script&family=Forum&family=Gideon+Roman&family=Great+Vibes&family=Karla:ital,wght@0,200;0,300;1,200;1,300&family=Lemonada:wght@300;400;500&family=Lobster&family=Merriweather:ital,wght@0,300;1,300&family=Monoton&family=Montserrat:ital,wght@0,100;0,300;0,500;0,800;1,100;1,300;1,500;1,800&family=Outfit:wght@200;500&family=Overlock:ital,wght@0,400;0,700;1,400;1,700&family=Staatliches&display=swap');

	.intro {
		// font-family: 'Montserrat', sans-serif;
		// font-family: 'Overlock', cursive;
		font-family: 'Merriweather', serif;
	}

    a {
        @apply underline underline-offset-4  decoration-sky-500
    }

	ol {
		font-family: 'Merriweather', serif;
		--list-counter-size: 2rem;
		counter-reset: intro-counter;
		list-style: none;
		li {
			counter-increment: intro-counter;
			margin: 0 0 0 0.5rem;
			padding: 0 0 0 0.5rem;
			position: relative;
			&::marker {
				content: counter(intro-counter) '. ';
				color: var(--color-sky-500);
				font-weight: 700;
				position: absolute;
				top: 0;
				left: calc(-1 * var(--list-counter-size));
				font-size: 2rem;
			}
			.li-heading {
				// font-family: 'Montserrat', sans-serif;
				@apply font-black italic text-xl opacity-100 text-emerald-200;
			}
			.li-snippet {
				font-family: 'Montserrat', sans-serif;
				@apply mt-3 font-light;
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
		// font-family: 'Outfit', sans-serif;
		font-family: 'Overlock', cursive;
		// font-family: 'Staatliches', cursive;
	}
	.article-date {
		font-family: monospace;
	}
	.projects-group {
		width: 96vw;
		font-family: 'Montserrat', sans-serif;
	}
	.projects {
		grid-template-columns: repeat(3, 1fr);
	}

	.project-tag {
		font-family: monospace;
	}
</style>
