import { createAvatar } from '@/utils/createAvatar'

interface MyAvatarProps {
  name: string
}

export function MyAvatar({ name }: MyAvatarProps) {
  return (
    <div className="bg-green-700 rounded-full items-center justify-center px-4 py-2">
      <span className="text-xl">{createAvatar(name).name}</span>
    </div>
  )
}
