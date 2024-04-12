import { useRef, useCallback, useEffect, HTMLProps, ReactEventHandler, MouseEventHandler } from "react";

// components
import Icon from "./Modal.icons";

// styles
import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";
import maps from "./Modal.module.scss";
const mc = mapClassesCurried(maps, true) as (c: string | string[]) => string;

interface IModal extends HTMLProps<HTMLDialogElement> {
  variant?: "bottom";
  onClose: () => void;
  locked?: boolean;
  onTransitionEnd?: () => void;
}

export default function Modal({
  className,
  variant,
  title,
  open,
  onClose = () => {},
  children,
  locked = false,
  onTransitionEnd,
}: IModal) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const classList = useClassList(
    { defaultClass: "modal", className, variant, maps, string: true },
    useCallback((_c: string[]) => !open && _c.push("modal--closing"), [open])
  ) as string;

  /**
   * Eventlistener: trigger close when close modal event
   */
  const handleClose: ReactEventHandler<HTMLDialogElement> = useCallback(
    (e: { preventDefault: () => void; stopPropagation: () => void }) => {
      e?.preventDefault();
      e?.stopPropagation();

      onClose();
    },
    [onClose]
  );

  /**
   * Eventlistener: trigger close when close modal event
   */
  const handleCloseClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e: { preventDefault: () => void; stopPropagation: () => void }) => {
      e?.preventDefault();
      e?.stopPropagation();

      onClose();
    },
    [onClose]
  );

  /**
   * Eventlistener: trigger onclose when cancel detected
   */
  const onCancel: ReactEventHandler<HTMLDialogElement> = useCallback(
    e => {
      e.preventDefault();

      if (!locked) {
        e?.preventDefault();
        e?.stopPropagation();

        onClose();
      }
    },
    [locked, onClose]
  );

  /**
   * Eventlistener: trigger onclose when click outside
   */
  const onClick: ReactEventHandler<HTMLDialogElement> = useCallback(
    e => {
      const { current: el } = modalRef;
      if (e.target === el && !locked) {
        e?.preventDefault();
        e?.stopPropagation();

        onClose();
      }
    },
    [locked, onClose]
  );

  /**
   * Eventlistener: trigger close click on anim end
   */
  const onAnimEnd: ReactEventHandler<HTMLDialogElement> = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();

      const { current: el } = modalRef;

      if (!open && el) el.close();

      onTransitionEnd && onTransitionEnd();
    },
    [onTransitionEnd, open]
  );

  // when open changes run open/close command
  useEffect(() => {
    const { current: el } = modalRef;

    if (open && el) el.showModal();
  }, [open]);

  return (
    <dialog
      className={classList}
      onClose={handleClose}
      onCancel={onCancel}
      onClick={onClick}
      onAnimationEnd={onAnimEnd}
      ref={modalRef}
    >
      <div className={mc("modal__header")} tabIndex={0}>
        <h2 className={mc("modal__title")}>{title}</h2>

        <button className={mc("modal__close")} onClick={e => handleCloseClick(e)}>
          <Icon type="close" />
        </button>
      </div>

      <div className={mc("modal__body")}>{children}</div>
    </dialog>
  );
}
