
<script lang="ts">
	import type { Snippet } from "svelte";

  type Props = {
    children: Snippet
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
  };
  let { type = 'button', disabled = false, onClick, children }: Props = $props();
</script>

<button 
  onclick={onClick} 
  {type}
  {disabled}
  class="cursor-pointer block rounded-md min-w-24 transition-colors bg-gray-900/70 px-3 py-2 text-center text-base font-medium text-white shadow-xs hover:bg-blue-700/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  class:disabled
>
  {@render children()}
</button>

<style lang="postcss">
  @reference "tailwindcss";

  .disabled {
    @apply opacity-50 cursor-not-allowed hover:bg-gray-700/50;
  }
</style>
