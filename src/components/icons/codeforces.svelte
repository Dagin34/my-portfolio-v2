<script lang="ts">
    export let size: number | string = 24;
    export let color: string = "currentColor";
    export let strokeWidth: number = 32;
</script>

<svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
>
    <!-- Left Bar (Shortest) -->
    <rect
        x="60" 
        y="320" 
        width="100" 
        height="140" 
        rx="30"
        fill="none"
        stroke={color}
        stroke-width={strokeWidth}
    />
    
    <!-- Middle Bar (Tallest) -->
    <rect
        x="206" 
        y="90" 
        width="100" 
        height="370" 
        rx="30"
        fill="none"
        stroke={color}
        stroke-width={strokeWidth}
    />
    
    <!-- Right Bar (Medium) -->
    <rect
        x="352" 
        y="220" 
        width="100" 
        height="240" 
        rx="30"
        fill="none"
        stroke={color}
        stroke-width={strokeWidth}
    />
</svg>