<script lang="ts">
	import Logo from "./Logo.svelte";

  let { paths } = $props();

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
</script>

<nav class="flex" aria-label="Breadcrumb">
  <ol role="list" class="flex h-12 space-x-4 rounded-md bg-gray-700/70 px-6 shadow-sm">
    <li class="flex items-center">
      <a href="/" class="text-gray-400 hover:text-gray-500">
        <Logo />
        <span class="sr-only">Home</span>
      </a>
    </li>
      {#each paths as path, i}
        {#if path !== 'role'}
          {@const fullPath = paths.slice(0, i + 1).join('/')}
          <li class="flex items-center">
            <svg class="h-full w-6 shrink-0 text-gray-400" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" aria-hidden="true">
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <a href="/{fullPath}" class="ml-4 text-sm font-medium text-gray-200 hover:text-blue-500">{capitalize(path)}</a>
          </li>
        {/if}
      {/each}
  </ol>
</nav>
