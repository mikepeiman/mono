<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/blog.json');
        // console.log(`🚀 ~ file: posts index.svelte ~ line 4 ~ load ~ res`, res)
		if (res.ok) {
			const { posts } = await res.json();
            console.log(`🚀 ~ file: index.svelte ~ line 7 ~ load ~ posts`, posts)
			return { props: { posts } };
		}
	};
</script>

<script>
	import Posts from "$components/Posts.svelte";
	export let posts
    console.log(`🚀 ~ file: POSTS index.svelte ~ line 15 ~ posts`, posts)
	posts.forEach(post => {
		
		console.log(`🚀 ~ file: index.svelte ~ line 20 ~ post`, post)
	});
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
	homeHeart1: 'bx:bxs-home-heart',
};
</script>

<!-- <a href="/blog" class="text-sky-500/[0.5] transition-all rounded-xl w-0">
	<Icon icon={icons.arrowCircle2}  class="w-12 h-12 -ml-2 mb-2 transition:all duration-200 hover:rotate-90 hover:text-sky-500" />
</a> -->
<div class="center">
	<a href="/" class="text-sky-500/[0.5] transition-all rounded-xl w-0">
		<Icon icon={icons.homeHeart1}  class="w-12 h-12 ml-2 mb-2 transition:all duration-200 hover:-translate-x-2 hover:text-sky-500" />
	</a>
	
	<div class="posts flex items-center w-full justify-center">
		<Posts {posts}/>
	</div>
</div>