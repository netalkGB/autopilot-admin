import Modal, { type ModalChildComponentMethods } from '@/components/modal/Modal'
import { type ForwardedRef, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import type { Schedule } from '@/app/types/Schedule'
import FeedModal, { type FeedModalChildComponentMethods } from '@/app/feed/modal/FeedModal'

interface FeedModalData {
  title: string
  feed: Schedule | null
}

export interface FeedModalContainerChildComponentMethods {
  open: (data: FeedModalData) => void
  close: () => void
}

interface FeedModalContainerProps {
  onClose: (data: FeedModalData) => void
  onOk: (data: FeedModalData) => void
  onCancel: (data: FeedModalData) => void
}

const FeedModalContainer = forwardRef((props: FeedModalContainerProps, ref: ForwardedRef<FeedModalContainerChildComponentMethods>) => {
  const modalRef = useRef<ModalChildComponentMethods>(null)
  const childModalRef = useRef<FeedModalChildComponentMethods>(null)
  const [feed, setFeed] = useState<Schedule | null>(null)
  const [title, setTitle] = useState<string>('')
  const open = (data: FeedModalData): void => {
    setTitle(data.title)
    setFeed(data.feed)
    modalRef.current?.open()
  }

  const close = (): void => {
    modalRef.current?.close()
  }

  useImperativeHandle(ref, () => ({
    open,
    close
  }))

  function createData (): FeedModalData {
    return {
      title,
      feed: childModalRef.current?.getForm() ?? null
    }
  }

  return (
    <Modal ref={modalRef} onClose={() => { props.onClose(createData()) }} title={title}>
      <FeedModal ref={childModalRef} activeFeed={feed} onOk={(feed: Schedule | null) => { props.onOk(createData()) }} onCancel={(feed: Schedule | null) => { props.onCancel(createData()) }} ></FeedModal>
    </Modal>
  )
})

FeedModalContainer.displayName = 'FeedModalContainer'

export default FeedModalContainer
