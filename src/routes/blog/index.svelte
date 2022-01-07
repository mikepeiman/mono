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
    // console.log(`🚀 ~ file: POSTS index.svelte ~ line 15 ~ posts`, posts)
</script>

<div class="posts py-12">
	<Posts {posts}/>
</div>