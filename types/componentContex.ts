import { useContext, wrapProperty } from '@nuxtjs/composition-api'
import { accessorType } from '~/store'

export default interface ComponentContext {
  $accessor: typeof accessorType
}

export const injectAccessor = (
  accessor: typeof accessorType,
  context: ComponentContext
) => {
  context.$accessor = accessor
}

const useAccessor = wrapProperty('$accessor', false)

export const buildComponentContext = () => {
  const accessor = useAccessor()
  const context = useContext() as unknown as ComponentContext

  injectAccessor(accessor, context)

  return context
}
