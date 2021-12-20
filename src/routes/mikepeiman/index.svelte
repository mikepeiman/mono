<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('../posts.json');
		// console.log(`🚀 ~ file: posts index.svelte ~ line 4 ~ load ~ res`, res)
		if (res.ok) {
			const { posts } = await res.json();
			return { props: { posts } };
		}
	};

	// import { icons } from '@iconify-json/mdi-light'
	// console.log(`🚀 ~ file: index.svelte ~ line 13 ~ icons `, icons )
</script>

<script>
	import Time from 'svelte-time';
	import IconAccountBox from '~icons/mdi/account-box';
	import Icon from '@iconify/svelte'; // this is the online component
	// import Icon, { addIcon } from '@iconify/svelte/dist/offline'; // this is the offline component
	// import bellFill from '@iconify-icons/bi/bell-fill'; // this is the specific offline icon import
	// import wrench from '@iconify-icons/fa/wrench'; // this is the specific offline icon import
	// addIcon('bell', bellFill); // offline components must be added this way
	// addIcon('wrench', wrench); // offline components must be added this way
	// <Icon icon={bellFill} inline={true} /> // this is the format for an offline icon
	import { collections } from '@iconify/collections';
	console.log(`🚀 ~ file: index.svelte ~ line 18 ~ collections`, collections);
	import Posts from '$components/Posts.svelte';
	export let posts;
	let selectedPosts = posts?.slice(0, 3);
	console.log(`🚀 ~ file: index.svelte ~ line 4 ~ posts`, posts);
	let projects = [
		{
			name: 'Project One',
			url: './creative/sketch01',
			tags: ['awesome', 'sauce', 'hot'],
			desc: 'This project will burn your socks off'
		},
		{
			name: 'Project Two',
			url: './creative/sketch02',
			tags: ['mysterious', 'fun', 'cool'],
			desc: 'This project will cool your noggin'
		},
		{
			name: 'Project Three',
			url: './creative/sketch03',
			tags: ['scary', 'epic', 'twisted'],
			desc: 'This project will twist your knickers'
		}
	];
</script>

<!-- <div class="flex flex-row mt-12">
    <IconAccountBox style="font-size: 2em; color: red"/>
    <Icon icon="mdi-light:home" width="4rem" />
    <Icon icon="line-md:image-twotone" inline={true} class="icon-img  text-green-400" width="4rem" />
    <Icon icon="eva:droplet-off-outline" inline={true} class="icon-img  text-blue-400" width="4rem" />
    <Icon icon="fa:wrench" inline={true} class="icon-img  text-stone-400" width="4rem" />
    <Icon icon="line-md:image-twotone" inline={true} class="icon-img  text-green-400" width="4rem" />
</div> -->
<main
	class="homepage bg-black flex flex-col self-center justify-items-center items-center w-full lg:text-sm lg:mx-12 lg:w-4/5 xl:w-3/4 2xl:w-3/5 3xl:w-1/2 mt-8"
>
	<section class="articles md:grid md:articles-change w-full px-8 self-center  p-3">
		<div class="intro flex flex-col md:pr-12 lg:pr-18 xl:pr-24">
			<h1 class="font-regular text-3xl lg:text-5xl">Hi, I'm Mike.</h1>
			<p class="intro-body text-lg font-thin">
				I'm a creative software developer, and this is my professional blog. I love
				<span class="text-highlight text-fuchsia-400">user experience</span> and design that helps
				realize human potential. I follow a <span class="text-highlight">first-principles</span>
				approach in my life and my work. Here are a few of my
				<span class="text-emerald-200 font-bold">design principles</span>:
			</p>
			<ol class="pl-7 mt-6">
				<li class="mt-4">
					<span class="li-heading">Never deny the user basic options.</span>
					<p class="li-snippet">
						Users should be provided the means to <span class="italic text-fuchsia-400 font-medium"
							>customize the user interface</span
						> as much as possible.
					</p>
				</li>
				<li class="mt-4">
					<span class="li-heading">Minimize barriers to action.</span>
					<p class="li-snippet">
						The app (or website) is <span class="italic text-sky-400 font-medium"
							>for something</span
						>. Make it as
						<span class="italic text-fuchsia-400 font-medium">intuitive and efficient</span>
						as possible to <span class="italic text-sky-400 font-medium">do that thing.</span>
					</p>
				</li>
				<li class="mt-4">
					<span class="li-heading">Leverage visual intelligence.</span>
					<p class="li-snippet">
						Augment words and iconography with <span class="italic text-fuchsia-400 font-medium"
							>color</span
						>
						and structure - <span class="italic text-fuchsia-400 font-medium">draw the eye</span> to
						key points and relationships. Effectively use negative space, layout and structure, diagrams
						and images to communicate beyond mere words.
					</p>
				</li>
			</ol>
		</div>

		<!-- SEPARATOR -->
		<div
			class="separator seprator-1 mt-9 h-6 rounded-xl md:hidden bg-gradient-to-bl from-emerald-500 via-cyan-500 to-emerald-500 w-full"
		/>
		<!-- SEPARATOR -->

		<div class="posts-panel flex flex-col self-center mt-9 mx-0 w-full md:mt-0">
			<div class="post w-full">
				<h2 class="uppercase -mt-2 mb-3 text-emerald-200">Recent posts</h2>
				{#each selectedPosts as post}
					<a href={`/posts/${post.slug}`} class="no-underline">
						<div
							class="post-card transition card card-body p-6 lg:p-9 bg-sky-500 bg-opacity-25 my-6 rounded-md hover:bg-sky-900 hover:-translate-x-2"
						>
							<div class="article-date p-0 m-0 text-xs font-light">
								<Time timestamp={post.date} />
							</div>
							<h3 class="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-3 -mt-1 font-bold text-white">{post.title}</h3>
							<p class="text-sm font-light">{post.excerpt}</p>
						</div>
					</a>
				{/each}
			</div>
			<span class="view-more text-right  pr-4 "
				><a
					href="/posts"
					class="view-more-link offset-4 no-underline hover:decoration-2 hover:decoration-sky-500 text-sky-500 hover:text-cyan-300 hover:decoration-2 hover:decoration-white hover:-translate-x-2 transition-all"
					>View more articles
				</a>
				<span class="text-sky-700 font-bold m-0 p-0">&#62</span>
				<span class="text-sky-500 font-bold -ml-2 p-0">&#62</span>
				<span class="text-sky-700 font-bold -ml-2 p-0">&#62</span>
			</span>
		</div>
        <!-- SEPARATOR -->
        <div
            class="separator separator-2 mt-9 h-6 rounded-xl bg-gradient-to-bl from-emerald-500 via-cyan-500 to-emerald-500 w-full"
        />
        <!-- SEPARATOR -->
	</section>


	<section
		class="statement flex flex-col w-full self-center text-center items-center justify-center px-8"
	>
		<p
			class="text-white text-3xl font-light italic text-center p-6 rounded-lg w-auto lg:w-2/3 self-center py-12 "
		>
			&ldquo;Truth, freedom, health, wisdom, goodness: I'm dedicated to these things, and actively
			trying to contribute to a society that embodies them more fully.&rdquo;
		</p>
	</section>
    
	<section class="projects-group flex flex-col w-full justify-center px-8">
        
            <!-- SEPARATOR -->
            <div
                class="separator separator-3 m-0 h-6 rounded-xl bg-gradient-to-bl from-emerald-500 via-cyan-500 to-emerald-500 w-full"
            />
            <!-- SEPARATOR -->
		<h2 class="uppercase  text-emerald-200 mt-9">Selected Projects</h2>
		<div class="projects md:grid w-full flex flex-col mb-12">
			{#each projects as project}
				<a href={`/${project.url}`} class="no-underline flex">
					<!-- make a 'projects' directory for these -->
					<div
						class="card bg-sky-500 bg-opacity-25 my-3 md:mx-3 rounded-md transition-all  bg-sky-500 bg-opacity-25 card-body  p-6 lg:p-9 rounded-md hover:bg-sky-900 hover:-translate-x-2 md:hover:-translate-y-2 md:hover:translate-x-0"
					>
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
				</a>
			{/each}
		</div>
	</section>
</main>

<style lang="scss">
	// @import url('https://fonts.googleapis.com/css2?family=Allura&family=Bad+Script&family=Coda:wght@400;800&family=Dancing+Script&family=Forum&family=Gideon+Roman&family=Great+Vibes&family=Karla:ital,wght@0,200;0,300;1,200;1,300&family=Lemonada:wght@300;400;500&family=Lobster&family=Merriweather:ital,wght@0, 100;0,300;0,500;0,700;0,900;1,100;1,300;1,500;1,700;1,900&family=Monoton&family=Montserrat:ital,wght@0,100;0,300;0,500;0,800;1,100;1,300;1,500;1,800&family=Outfit:wght@200;500&family=Overlock:ital,wght@0,400;0,700;1,400;1,700&family=Staatliches&display=swap');

	.homepage {
		// font-family: 'Be Vietnam Pro', sans-serif;
		// font-family: 'Fira Sans', sans-serif;
		// font-family: 'Newsreader', serif;
		// font-family: 'Noto Sans Display', sans-serif;
		// font-family: 'Nunito', sans-serif;
		font-family: 'Sarabun', sans-serif;
		// font-family: 'Source Sans 3', sans-serif;
		// font-family: 'Source Serif 4', sans-serif;
		// font-family: 'Vollkorn', serif;
	}

    .articles-change {
        grid-template-areas: 'intro posts'
        'separator separator';
    }

	.icon-img {
		color: var(--color-fuchsia-300);
		@apply emerald-500;
		color: blue;
		background: red;
	}

	h1 {
		// @apply lg:text-xl xl:text-2xl 2xl:text-4xl 3xl:text-6xl;
		// these media queries do not work with @apply, need another strategy
	}
    .separator-2 {
        grid-area: separator;
    }

	.intro {
        grid-area: intro;
		// font-family: 'Be Vietnam Pro', sans-serif;
		// font-family: 'Montserrat', sans-serif;
		font-family: 'Nunito', sans-serif;
		// font-family: 'Sarabun', sans-serif;
		// font-family: 'Source Serif 4', sans-serif;
		// font-family: 'Noto Sans Display', sans-serif;
		// font-family: 'Source Sans 3', sans-serif;
		// font-family: 'Karla', sans-serif;
		// font-family: 'Fira Sans', sans-serif;
		// font-family: 'Newsreader', serif;
		// font-family: 'Vollkorn', serif;
		// font-family: 'Merriweather', serif;
		//  font-family: 'Overlock', cursive;

		h1 {
			// font-family: 'Nunito', sans-serif;
			font-family: 'Newsreader', serif;
			// font-family: 'Sarabun', sans-serif;
			// font-family: 'Source Serif 4', sans-serif;
			// font-family: 'Vollkorn', serif;
			// font-family: 'Be Vietnam Pro', sans-serif;
			// font-family: 'Fira Sans', sans-serif;
			// font-family: 'Noto Sans Display', sans-serif;
			// font-family: 'Source Sans 3', sans-serif;
			// font-family: 'Merriweather', serif;
			// font-family: 'Karla', sans-serif;
			//  font-family: 'Overlock', cursive;
			font-weight: 900;
		}
	}
	.intro-body {
		// font-family: 'Montserrat', sans-serif;
		// font-family: 'Karla', sans-serif;
		line-height: 1.4;
		@apply mt-3 font-light;
	}
	.text-highlight {
		// font-family: 'Montserrat', sans-serif;
		// font-family: 'Karla', sans-serif;
		@apply mt-4 font-bold text-sky-500 italic;
	}

	a {
		// @apply underline underline-offset-4  decoration-sky-500;
	}
    .posts-panel {
        grid-area: posts;
    }

	.post-card {
		position: relative;
		transition: 0.3s;
		&:after {
			content: 'Read this...';
			position: absolute;
			opacity: 0;
			bottom: 0;
			right: 0;
			transition: 0.3s;
			padding: 0.5rem;
		}
		&:hover {
			&:after {
				content: 'Read this...';
				position: absolute;
				opacity: 1;
				bottom: 0;
				right: 0;
				transition: 0.3s;
				@apply text-cyan-400;
			}
		}
	}

	ol {
		// font-family: 'Merriweather', serif;
		--list-counter-size: 1.5rem;
		counter-reset: intro-counter;
		list-style: none;
		position: relative;
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
				position: relative;
				left: 0.75rem;
				@apply font-extrabold italic text-xl  text-emerald-200 leading-none;
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
		font-family: 'Karla', sans-serif;
		// font-family: 'Merriweather', serif;
		// font-family: 'Montserrat', sans-serif;
		// font-family: 'Outfit', sans-serif;
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
