function getFirstCharacter(name: string) {
  return name && name.charAt(0).toUpperCase()
}

export function createAvatar(name: string) {
  return {
    name: getFirstCharacter(name),
  } as const
}
