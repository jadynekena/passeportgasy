import { useEffect, useRef } from "react"
import autoAnimate, {
  AutoAnimateOptions,
  AutoAnimationPlugin,
} from "@formkit/auto-animate"

export default function useAutoAnimation<T extends HTMLElement>(
  config?: Partial<AutoAnimateOptions> | AutoAnimationPlugin | undefined
) {
  const ref = useRef<T>(null)
  useEffect(() => {
    ref.current && autoAnimate(ref.current, config)
  }, [config])

  return ref
}
