<script lang="ts">
  type Props = {
    value: string;
    href: string;
  };
  let { value, href}: Props = $props();
</script>

<a href={href} class="text-blue-600 font-mono hover:underline">{value}</a>
