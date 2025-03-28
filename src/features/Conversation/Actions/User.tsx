import { ActionIconGroup } from '@lobehub/ui';
import { ActionIconGroupItems } from '@lobehub/ui/es/ActionIconGroup';
import { memo, useContext, useMemo } from 'react';

import { useChatStore } from '@/store/chat';
import { threadSelectors } from '@/store/chat/slices/thread/selectors';

import { InPortalThreadContext } from '../components/ChatItem/InPortalThreadContext';
import { useChatListActionsBar } from '../hooks/useChatListActionsBar';
import { RenderAction } from '../types';
import { useCustomActions } from './customAction';

export const UserActionsBar: RenderAction = memo(({ onActionClick, id }) => {
  const [isThreadMode, hasThread] = useChatStore((s) => [
    !!s.activeThreadId,
    threadSelectors.hasThreadBySourceMsgId(id)(s),
  ]);
  const { regenerate, edit, copy, divider, del } = useChatListActionsBar({ hasThread });
  const { translate, tts } = useCustomActions();

  const inPortalThread = useContext(InPortalThreadContext);
  const inThread = isThreadMode || inPortalThread;

  const items = useMemo(
    () => [regenerate, edit, del].filter(Boolean) as ActionIconGroupItems[],
    [inThread],
  );

  return (
    <ActionIconGroup
      dropdownMenu={[edit, copy, divider, tts, translate, divider, regenerate, del]}
      items={items}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
});
