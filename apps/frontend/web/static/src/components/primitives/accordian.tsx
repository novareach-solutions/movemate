"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react"; // Or your preferred icons
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-gray-200 last:border-b-0", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      ref={ref}
      // Notice the special classes that hide the plus when open, minus when closed
      className={cn(
        "group flex w-full items-center justify-between py-4 text-base font-medium text-gray-900 text-left transition-all",
        "[&[data-state=open]>.icon-plus]:hidden", // Hide plus icon if open
        "[&[data-state=closed]>.icon-minus]:hidden", // Hide minus icon if closed
        className
      )}
      {...props}
    >
      {/* The FAQ question text */}
      {children}
      {/* Icons */}
      <span className="icon-plus">
        <Plus className="h-5 w-5 shrink-0 text-gray-500 group-hover:text-gray-600" />
      </span>
      <span className="icon-minus">
        <Minus className="h-5 w-5 shrink-0 text-gray-500 group-hover:text-gray-600" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm text-gray-700",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="py-3 leading-relaxed">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
