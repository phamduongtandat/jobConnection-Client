import { Listbox as OriginalListBox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useController } from 'react-hook-form';
import { BsCheck2 } from 'react-icons/bs';
import { HiOutlineChevronUpDown } from 'react-icons/hi2';

export default function ListBox({
  control,
  fieldName,
  options = [{ value: 'Can not find any options' }],
  placeholder,
  multiple,
  wrapperClassName,
  hasError,
}) {
  const { field } = useController({
    control,
    name: fieldName,
  });

  const defaultValue = multiple ? [] : '';
  const selectedOption = options.find((option) => option.value === field.value);
  const name = selectedOption?.name;

  return (
    <div className={wrapperClassName}>
      <OriginalListBox
        value={field.value || defaultValue}
        onChange={field.onChange}
        multiple={multiple}
      >
        <div className="relative">
          <OriginalListBox.Button
            className={`relative focus:outline-dark focus:outline-offset-0 cursor-pointer outline-none group h-10 w-full border border-border rounded-md bg-white pl-3 pr-10 text-left sm:text-sm ${
              hasError ? 'border-error focus:outline-0' : ''
            }`}
          >
            <span className="truncate">
              {field.value && Array.isArray(field.value)
                ? `Đã lựa chọn (${field.value.length})`
                : name || field.value}
              {!field.value && placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiOutlineChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </OriginalListBox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <OriginalListBox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options?.map((option) => (
                <OriginalListBox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-100' : ''
                    }`
                  }
                  value={option.value}
                  disabled={option.value === 'Can not find any options'}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.name || option.value}
                      </span>
                      {selected ? (
                        <span className="absolute text-primary inset-y-0 left-0 flex items-center pl-3">
                          <BsCheck2 className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </OriginalListBox.Option>
              ))}
            </OriginalListBox.Options>
          </Transition>
        </div>
      </OriginalListBox>
    </div>
  );
}
