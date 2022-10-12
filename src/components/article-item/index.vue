<template>
  <van-cell
    class="article-item"
    title="111"
    label="描述信息"
    :to="'/article/' + article.art_id"
  >
    <div slot="title" class="title">{{ article.title }}</div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          v-for="(item, index) in article.cover.images"
          :key="index"
          class="cover-item"
        >
          <van-image
            slot="default"
            :src="item"
            fit="cover"
            class="cover-item-img"
          />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}</span>
        <span>{{ article.pubdate }}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      :src="article.cover.images[0]"
      fit="cover"
      class="right-cover"
    />
  </van-cell>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang='less'>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    .cover-item {
      flex: 1;
      height: 146px;
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>