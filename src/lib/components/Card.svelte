  <script lang="ts">
    import type { Snippet } from "svelte";
    type Props = {
      children: Snippet;
      actionButtons?: Snippet;
    };
    let { children, actionButtons }: Props = $props();
  </script>
  
<div class="w-full divide-y divide-gray-200 rounded-lg bg-white shadow-sm">
  <div class="flex w-full items-center justify-between space-x-6 p-6">
    {@render children()}
  </div>
  {#if actionButtons}
    <div class="-mt-px flex justify-end divide-x divide-gray-200 gap-2 p-2">
      {@render actionButtons()}
    </div>
  {/if}
</div>
