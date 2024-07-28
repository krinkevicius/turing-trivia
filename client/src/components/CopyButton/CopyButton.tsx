import Button from '@/components/ui/Button'
import { useState } from 'react'

type Props = {
  textToCopy: string
  delay?: number
}

export default function CopyButton({ textToCopy, delay = 3000 }: Props) {
  const [buttonText, setButtonText] = useState<'Copy' | 'Copied!'>('Copy')

  const copyText = () => {
    navigator.clipboard.writeText(textToCopy)
    setButtonText('Copied!')

    setTimeout(() => {
      setButtonText('Copy')
    }, delay)
  }

  return (
    <Button
      className="!text-xs !bg-copyBtn !w-20 !hover:bg-copyBtnHover !focus:ring-copyBtnHover"
      disabled={!textToCopy}
      onClick={copyText}
    >
      {buttonText}
    </Button>
  )
}
