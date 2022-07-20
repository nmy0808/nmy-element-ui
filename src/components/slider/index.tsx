import { defineComponent, PropType } from 'vue'
import { ElMenu, MenuProps, ElMenuItem, ElSubMenu, ElIcon } from 'element-plus'
import 'element-plus/es/components/menu/style/css'
import './style.scss'
import NIcon from '@/components/nIcon/src/index.vue'

export default defineComponent({
  name: 'Slider',
  components: { ElMenu, ElMenuItem, ElSubMenu, ElIcon, NIcon },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object as PropType<Partial<MenuProps>>,
      default: () => ({})
    }
  },
  setup(props) {
    const render = (data: any[]) => {
      return data.map((item) => {
        const Icon = item.meta.icon ? (
          <NIcon icon={item.meta.icon}></NIcon>
        ) : null
        const renderSlots = {
          title: () => (
            <>
              {Icon}
              <span>{item.meta.title}</span>
            </>
          )
        }

        if (item.children && item.children.length > 0) {
          return (
            <el-sub-menu index={item.path} v-slots={renderSlots}>
              {render(item.children)}
            </el-sub-menu>
          )
        } else {
          return (
            <el-menu-item index={item.path}>{renderSlots.title()}</el-menu-item>
          )
        }
      })
    }
    return () => {
      return <el-menu {...props.options}>{render(props.data)}</el-menu>
    }
  }
})
