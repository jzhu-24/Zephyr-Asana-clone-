@columns.each do |column|
  json.set! column.id do
    json.partial! 'column', column: column
  end
end