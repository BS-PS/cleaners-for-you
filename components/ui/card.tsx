import { cn } from '@/lib/utils';

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('bg-white rounded-2xl shadow-sm border border-gray-100', className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 py-4 border-b border-gray-100', className)}>{children}</div>;
}

export function CardBody({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 py-4', className)}>{children}</div>;
}
