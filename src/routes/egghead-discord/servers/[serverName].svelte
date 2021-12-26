<script context="module">
    // export async function load({page, fetch, session, context}) {
    //     return {
    //         props: {
    //             serverName: page.params.serverName
    //         }
    //     }
    // }
</script>

<script>
    // export let serverName
    import { page }from '$app/stores'
    const serverName = $page.params.serverName
</script>

<h1>{serverName}</h1>