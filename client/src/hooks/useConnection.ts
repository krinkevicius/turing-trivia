import { useEffect } from 'react'
import { socket } from '@/libs/socket'
import { useUserStore } from '@/store/userStore'

export default function useConnection() {
  const setConnectionStatus = useUserStore(state => state.setConnectionStatus)

  useEffect(() => {
    const onConnect = () => {
      console.log('Connected to server')
      setConnectionStatus('connected')
    }

    socket.on('connect', onConnect)

    return () => {
      socket.off('connect', onConnect)
    }
  }, [setConnectionStatus])
}
