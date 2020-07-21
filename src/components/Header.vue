<template>
    <div class="header">
        <span></span>
        <div class="header-contact">
            <span>support@example.ru</span>
            <span>8 (918) 500-50-50</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style lang="scss">
@import "../assets/mixin/_mixin.scss";

.header {
    grid-column: 2/3;
    grid-row: 1/2;
    box-shadow: 0px 10px 6px 0px rgba(0, 0, 0, 0.06);
    padding: 0 40px;
    @include flex();
    justify-content: space-between;
    .header-contact {
        @include flex();
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>