<template>
  <div class="left">
    <div class="left__header">
      <div class="search-box">
        <el-input
          v-model="searchText"
          placeholder="搜索组件..."
          clearable
          size="small"
          :prefix-icon="Search"
        />
      </div>
      <div class="component-categories">
        <el-tabs v-model="activeCategory" @tab-change="handleCategoryChange">
          <el-tab-pane
            v-for="category in categories"
            :key="category.value"
            :label="category.label"
            :name="category.value"
          >
            <template #label>
              <span class="category-label">
                <el-icon v-if="category.icon" size="16">
                  <component :is="category.icon" />
                </el-icon>
                {{ category.label }}
              </span>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    
    <div class="component-groups">
      <div class="component-group" v-for="group in filteredComponentGroups" :key="group.name">
        <div class="group-title">{{ group.title }}</div>
        <div class="group-components">
          <div
            v-for="component in group.components"
            :key="component.type"
            class="component-card"
            draggable="true"
            @dragstart="handlePaletteDragStart(component.type, $event)"
            @dragend="resetDragIndicator"
            @click="handleAddComponent(component.type)"
          >
            <div class="component-card__icon">
              <el-icon v-if="component.icon" size="20">
                <component :is="component.icon" />
              </el-icon>
              <span v-else class="icon-placeholder">{{ component.label.charAt(0) }}</span>
            </div>
            <div class="component-card__info">
              <div class="component-card__title">{{ component.label }}</div>
              <div class="component-card__desc">{{ component.description }}</div>
            </div>
            <div class="component-card__action">
              <el-icon><Plus /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Plus, Grid, Picture, ShoppingCart, Ticket, User, ChatDotSquare } from '@element-plus/icons-vue'

// 搜索文本
const searchText = ref('')
// 当前激活的分类
const activeCategory = ref('basic')

// 分类列表
const categories = [
  { label: '基础组件', value: 'basic', icon: Grid },
  { label: '图文组件', value: 'media', icon: Picture },
  { label: '商品组件', value: 'product', icon: ShoppingCart },
  { label: '营销组件', value: 'marketing', icon: Ticket },
  { label: '用户组件', value: 'user', icon: User },
  { label: '互动组件', value: 'interaction', icon: ChatDotSquare }
]

// 所有组件数据
const componentGroups = [
  {
    name: 'basic',
    title: '基础组件',
    components: [
      { type: 'button', label: '按钮', icon: 'Pointer', description: '可配置文字、样式、事件的按钮' },
      { type: 'text', label: '文本', icon: 'Edit', description: '普通文本，可设置样式和内容' },
      { type: 'image', label: '图片', icon: 'Picture', description: '图片展示组件' },
      { type: 'divider', label: '分割线', icon: 'Minus', description: '用于内容分隔' },
      { type: 'spacer', label: '间距', icon: 'Expand', description: '空白间距组件' },
      { type: 'container', label: '容器', icon: 'Folder', description: '用于包裹其他组件的容器' }
    ]
  },
  {
    name: 'media',
    title: '图文组件',
    components: [
      { type: 'image-text', label: '图文混排', icon: 'DocumentCopy', description: '图片和文字组合展示' },
      { type: 'carousel', label: '轮播图', icon: 'Switch', description: '图片轮播展示' },
      { type: 'video', label: '视频', icon: 'VideoPlay', description: '视频播放组件' },
      { type: 'rich-text', label: '富文本', icon: 'EditPen', description: '支持HTML的富文本编辑器' }
    ]
  },
  {
    name: 'product',
    title: '商品组件',
    components: [
      { type: 'product-list', label: '商品列表', icon: 'List', description: '商品列表展示' },
      { type: 'product-grid', label: '商品网格', icon: 'Grid', description: '网格状商品展示' },
      { type: 'product-slider', label: '商品滑动', icon: 'TrendCharts', description: '横向滑动商品展示' },
      { type: 'product-detail', label: '商品详情', icon: 'Goods', description: '商品详细信息展示' },
      { type: 'category-nav', label: '分类导航', icon: 'Menu', description: '商品分类导航' },
      { type: 'recommend', label: '推荐商品', icon: 'Star', description: '智能推荐商品' }
    ]
  },
  {
    name: 'marketing',
    title: '营销组件',
    components: [
      { type: 'coupon', label: '优惠券', icon: 'Ticket', description: '优惠券展示和领取' },
      { type: 'countdown', label: '倒计时', icon: 'Clock', description: '活动倒计时组件' },
      { type: 'promotion-bar', label: '促销栏', icon: 'Promotion', description: '顶部促销信息栏' },
      { type: 'seckill', label: '秒杀', icon: 'Timer', description: '限时秒杀活动' },
      { type: 'group-buy', label: '拼团', icon: 'UserFilled', description: '拼团活动组件' },
      { type: 'bargain', label: '砍价', icon: 'Scissor', description: '砍价活动组件' }
    ]
  },
  {
    name: 'user',
    title: '用户组件',
    components: [
      { type: 'user-card', label: '用户卡片', icon: 'User', description: '用户信息展示' },
      { type: 'login-form', label: '登录表单', icon: 'Key', description: '用户登录表单' },
      { type: 'register-form', label: '注册表单', icon: 'UserFilled', description: '用户注册表单' },
      { type: 'address', label: '地址管理', icon: 'Location', description: '收货地址管理' }
    ]
  },
  {
    name: 'interaction',
    title: '互动组件',
    components: [
      { type: 'comment', label: '评论', icon: 'ChatDotSquare', description: '用户评论组件' },
      { type: 'share', label: '分享', icon: 'Share', description: '社交分享组件' },
      { type: 'vote', label: '投票', icon: 'Check', description: '投票互动组件' },
      { type: 'form', label: '表单', icon: 'Document', description: '自定义表单组件' }
    ]
  }
]

// 过滤后的组件组
const filteredComponentGroups = computed(() => {
  const currentGroup = componentGroups.find(group => group.name === activeCategory.value)
  
  if (!searchText.value.trim()) {
    return [currentGroup]
  }
  
  // 如果有搜索词，过滤所有分类
  const searchLower = searchText.value.toLowerCase()
  const filteredGroups = componentGroups.map(group => ({
    ...group,
    components: group.components.filter(component =>
      component.label.toLowerCase().includes(searchLower) ||
      component.description.toLowerCase().includes(searchLower)
    )
  })).filter(group => group.components.length > 0)
  
  return filteredGroups
})

// 事件处理
const emit = defineEmits(['add-component', 'drag-start'])

const handleCategoryChange = () => {
  // 切换分类时的逻辑
  console.log('切换分类到:', activeCategory.value)
}

const handlePaletteDragStart = (componentType, event) => {
  emit('drag-start', componentType, event)
}

const resetDragIndicator = () => {
  // 重置拖拽指示器
}

const handleAddComponent = (componentType) => {
  emit('add-component', componentType)
}
</script>

<style scoped lang="less">
.left {
  width: 320px;
  min-width: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-right: 1px solid #e4e7ed;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  &__header {
    padding: 16px 16px 0;
    border-bottom: 1px solid #f0f2f5;
    background: #fff;
    
    .search-box {
      margin-bottom: 12px;
      
      :deep(.el-input__wrapper) {
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      }
    }
  }

  .component-categories {
    :deep(.el-tabs) {
      .el-tabs__header {
        margin-bottom: 0;
      }
      
      .el-tabs__nav-wrap::after {
        height: 1px;
        background-color: #f0f2f5;
      }
      
      .el-tabs__item {
        padding: 0 12px;
        height: 36px;
        font-size: 13px;
        
        .category-label {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
      
      .el-tabs__active-bar {
        height: 2px;
      }
    }
  }

  .component-groups {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    
    .component-group {
      margin-bottom: 24px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .group-title {
        font-size: 13px;
        font-weight: 600;
        color: #909399;
        margin-bottom: 12px;
        padding-left: 8px;
        border-left: 3px solid #409eff;
      }
      
      .group-components {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
      }
    }
  }
}

.component-card {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: #fff;
  cursor: grab;
  transition: all 0.2s ease;
  position: relative;
  user-select: none;
  
  &:hover {
    border-color: #409eff;
    background: #f5f7fa;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(64, 158, 255, 0.1);
    
    .component-card__action {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  &__icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
    margin-right: 12px;
    
    .icon-placeholder {
      font-size: 18px;
      font-weight: bold;
      color: #409eff;
    }
    
    .el-icon {
      color: #409eff;
    }
  }
  
  &__info {
    flex: 1;
    min-width: 0;
  }
  
  &__title {
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    margin-bottom: 4px;
    line-height: 1.2;
  }
  
  &__desc {
    font-size: 12px;
    color: #909399;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  &__action {
    flex-shrink: 0;
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.2s ease;
    
    .el-icon {
      color: #409eff;
      font-size: 16px;
    }
  }
}

// 滚动条样式
.component-groups::-webkit-scrollbar {
  width: 6px;
}

.component-groups::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 3px;
}

.component-groups::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
  
  &:hover {
    background: #a8a8a8;
  }
}
</style>