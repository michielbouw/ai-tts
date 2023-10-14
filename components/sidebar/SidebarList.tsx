import { getCommands, removeCommand } from '@/app/actions';
import { SidebarActions } from '@/components/sidebar/SidebarActions';
import { SidebarItem } from '@/components/sidebar/SidebarItem';

export interface SidebarListProps {
  userId?: string;
}

export async function SidebarList({ userId }: SidebarListProps) {
  const commands = await getCommands(userId);

  return (
    <div className="flex-1 overflow-auto">
      {commands?.length ? (
        <div className="space-y-2 px-2">
          {commands.map(
            command =>
              command && (
                <SidebarItem key={command?.id} command={command}>
                  <SidebarActions
                    command={command}
                    removeCommand={removeCommand}
                  />
                </SidebarItem>
              ),
          )}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No command history</p>
        </div>
      )}
    </div>
  );
}
