export interface ICheckBoxEvent {
  currentTarget: { checked: boolean | ((prevState: boolean) => boolean) };
}
