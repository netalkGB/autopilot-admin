import Modal, { type ModalChildComponentMethods } from '@/components/modal/Modal'
import { type ForwardedRef, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import type { Schedule } from '@/app/types/Schedule'
import FeedModal, { type FeedModalChildComponentMethods } from '@/app/feed/modal/FeedModal'

export interface FeedModalData {
  title: string
  feed: Schedule | null
}

export interface FeedModalContainerChildComponentMethods {
  open: (data: FeedModalData) => void
  close: () => void
}

interface FeedModalContainerProps {
  onClose: (originalModalData: FeedModalData, updatedData: FeedModalData) => void
  onOk: (originalModalData: FeedModalData, updatedData: FeedModalData) => void
  onCancel: (originalModalData: FeedModalData, updatedData: FeedModalData) => void
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

  function createUpdatedData (): FeedModalData {
    return {
      title,
      feed: childModalRef.current?.getForm() ?? null
    }
  }

  function createOriginalData (): FeedModalData {
    return {
      title,
      feed
    }
  }

  return (
    <Modal ref={modalRef} onClose={() => { props.onClose(createOriginalData(), createUpdatedData()) }} title={title}>
      <FeedModal ref={childModalRef} activeFeed={feed} onOk={(feed: Schedule | null) => { props.onOk(createOriginalData(), createUpdatedData()) }} onCancel={(feed: Schedule | null) => { props.onCancel(createOriginalData(), createUpdatedData()) }} ></FeedModal>
    </Modal>
  )
})

FeedModalContainer.displayName = 'FeedModalContainer'

export default FeedModalContainer
