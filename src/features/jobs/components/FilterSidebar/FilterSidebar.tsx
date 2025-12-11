// src/features/jobs/components/FilterSidebar/FilterSidebar.tsx
"use client"

import { memo } from "react"
import {
  FILTER_CARD_CLASSES,
  FILTER_SECTION_TITLE_CLASSES,
  EXPERIENCE_OPTIONS,
  APPLY_TYPE_OPTIONS,
  SORT_OPTIONS,
} from "./consts"

import { useFilterSidebar } from "./useFilterSidebar"

import { Card } from "../../../../components/ui/card"

import { Slider } from "../../../../components/ui/slider"
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select"
import { Separator } from "../../../../components/ui/separator"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../../../components/ui/sheet"
import { Button } from "../../../../components/ui/button"
import { Filter, RotateCcw } from "lucide-react"

/* ----------------- BODY ----------------- */

const FilterBody = memo(({ 
  form, 
  hasActiveFilters,
  handleInputChange, 
  handleSalaryChange, 
  resetFilters 
}: ReturnType<typeof useFilterSidebar>) => (
  <div className="space-y-2">
    {/* EXPERIENCE */}
    <div>
      <p className={FILTER_SECTION_TITLE_CLASSES}>Experience Level</p>
      <RadioGroup
        value={form.experienceLevel}
        onValueChange={(val) => handleInputChange("experienceLevel", val)}
      >
        {EXPERIENCE_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors"
          >
            <RadioGroupItem value={opt.value} />
            <span>{opt.label}</span>
          </label>
        ))}
      </RadioGroup>
    </div>

    {/* APPLY TYPE */}
    <div>
      <p className={FILTER_SECTION_TITLE_CLASSES}>Application Type</p>
      <Select
        value={form.applyType}
        onValueChange={(val) => handleInputChange("applyType", val)}
      >
        <SelectTrigger className="h-9">
          <SelectValue placeholder="Any" />
        </SelectTrigger>
        <SelectContent>
          {APPLY_TYPE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <Separator />

    {/* SALARY */}
    <div>
      <p className={FILTER_SECTION_TITLE_CLASSES}>Salary Range (LPA)</p>
      <Slider
  min={0}
  max={50}
  step={1}
  value={[form.minSalary, form.maxSalary]}
  onValueChange={(v) => handleSalaryChange(v, false)}   // smooth UI update
  onValueCommit={(v) => handleSalaryChange(v, true)}    // update URL only after stop
  className="my-4"
/>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>₹{form.minSalary}L</span>
        <span>₹{form.maxSalary}L+</span>
      </div>
    </div>

    <Separator />

    {/* SORT */}
    <div>
      <p className={FILTER_SECTION_TITLE_CLASSES}>Sort By</p>
      <Select
        value={form.sort}
        onValueChange={(val) => handleInputChange("sort", val)}
      >
        <SelectTrigger className="h-9">
          <SelectValue placeholder="Most Recent" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {/* RESET BUTTON */}
    {hasActiveFilters && (
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full text-xs mt-2"
        onClick={resetFilters}
      >
        <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
        Reset All Filters
      </Button>
    )}
  </div>
))
FilterBody.displayName = "FilterBody"

/* ----------------- MAIN SIDEBAR ----------------- */

export default function FilterSidebar() {
  const filterState = useFilterSidebar()

  return (
    <>
      {/* MOBILE SHEET */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="w-4 h-4 mr-2" /> Filters
              {filterState.hasActiveFilters && (
                <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                  Active
                </span>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[85%] sm:w-[320px] p-0 overflow-y-auto">
            <SheetHeader className="border-b px-4 py-3 bg-background sticky top-[20px] z-10">
              <SheetTitle className="text-sm font-semibold">Filter Jobs</SheetTitle>
            </SheetHeader>

            <div className="p-4 ">
              <Card className={FILTER_CARD_CLASSES}>
                <FilterBody {...filterState} />
              </Card>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP - Card (sticky handled by parent in JobsPage) */}
      <Card className={`${FILTER_CARD_CLASSES} hidden md:block w-full`}>
        <FilterBody {...filterState} />
      </Card>
    </>
  )
}