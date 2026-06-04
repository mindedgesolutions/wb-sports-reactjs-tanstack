import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/dark-mode/theme-provider';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-5 md:h-7 w-7 md:w-9 rounded-none bg-transparent outline-0"
        >
          <Sun
            className="h-4 md:h-6 w-6 md:w-8 cursor-pointer flex flex-row justify-center items-center gap-0.5 text-muted-foreground scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
            onClick={() => setTheme('dark')}
          />
          <Moon
            className="absolute h-4 md:h-6 w-6 md:w-8 cursor-pointer flex flex-row justify-center items-center gap-0.5 text-muted-foreground scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
            onClick={() => setTheme('light')}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
